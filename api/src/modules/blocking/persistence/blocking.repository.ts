import { Client } from 'pg'

import prismaClient from '../../common/persistence/prisma-client'

import { pipeline } from 'node:stream/promises'
import { exec } from 'node:child_process'
import util from "node:util"

import Option from '../../common/types/Option.type'
import { CreateBlockingReportDTO, CreateBlockingReportResponseDTO, ListBlockingReportDTO, ListBlockingReportResponseDTO } from '../dto/blocking.dto'
import IBlockingRepository from '../service/IBlockingRepository'

const skus = [
  {
    name: 'HBM3M',
    intervalStart: '3 month 1 day',
    intervalEnd: '3 month'
  },
  {
    name: 'HBM1A',
    intervalStart: '1 year 1 day',
    intervalEnd: '1 year'
  },
  {
    name: 'HBM3A',
    intervalStart: '3 year 1 day',
    intervalEnd: '3 year'
  }
]

export default class BlockingRepository implements IBlockingRepository {
  toDate = (datetime: string) => {
    if (datetime === 'NA') return null
    const date = datetime.slice(0, 8)
    const parts = date.split('-')
    const formatedDate = `20${parts[2]}-${parts[1]}-${parts[0]}`
    return new Date(formatedDate)
  }

  getTimeElapsedFromDate = (datetime: Date) => {
    const timeTaken = new Date().getTime() - datetime.getTime()
    const timeTakenInSeconds = timeTaken / 1000
    return timeTakenInSeconds
  }

  async createBlockingReport ({ files, reportedAt }: CreateBlockingReportDTO): Promise<CreateBlockingReportResponseDTO> {
    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await pgClient.connect()

    ///////////

    let blockingDevice = null

    blockingDevice = await prismaClient.blockingDeviceImport.findUnique({
      where: {
        reportedAt: new Date(reportedAt)
      },
    }) ?? await prismaClient.blockingDeviceImport.create({
      data: {
        reportedAt: new Date(reportedAt),
      },
      include: {
        logProcess: true,
      }
    })

    /* START STEP 0 */

    console.log(`[!] STEP 0: Clean tables`)

    await pgClient.query(`TRUNCATE "BlockingDeviceDataRaw"`)

    await prismaClient.blockingDeviceImportLogProcess.deleteMany({
      where: {
        blockingDeviceImportId: blockingDevice.id
      }
    })
    await prismaClient.blockingDeviceImportLogFile.deleteMany({
      where: {
        blockingDeviceImportId: blockingDevice.id
      }
    })
    await prismaClient.blockingDeviceConsolidatedReport.deleteMany({
      where: {
        blockingDeviceImportId: blockingDevice.id
      }
    })

    /* END STEP 0 */

    /* START STEP 1 */

    console.log(`[!] STEP 1: Import files`)

    const importStatus = await prismaClient.blockingDeviceImportLogProcess.create({
      data: {
        name: 'Import files',
        type: 'import',
        blockingDeviceImportId: blockingDevice.id
      }
    })

    const { from: copyFrom } = require('pg-copy-streams')
    const fs = require('node:fs')
    const execPromise = util.promisify(exec)

    const startTime = new Date()

    console.log(`[!] Start time: ${startTime}`)

    for (const [index, file] of files.entries()) {
      await prismaClient.blockingDeviceImportLogFile.create({
        data: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          blockingDeviceImportId: blockingDevice.id
        }
      })

      let customerEmail = ''

      try {
        const { stdout, stderr } = await execPromise(`head -2 ${file.path} | tail -1 | cut -d',' -f1 | xargs echo -n`)
        customerEmail = stdout
      } catch (error) {
        console.log(error)
      }

      try {
        const { stdout, stderr } = await execPromise(`tail -n +5 ${file.path} | head -n -1 > ${file.path}_prepared`)
      } catch (error) {
        console.log(error)
      }

      const sourceStream = fs.createReadStream(`${file.path}_prepared`)

      try {
        console.log(`[!] Customer ${index + 1}: ` + customerEmail)

        await pgClient.query(`SET datestyle = dmy`)
        await pgClient.query(`ALTER TABLE "BlockingDeviceDataRaw" ALTER COLUMN "customerEmail" SET DEFAULT '${customerEmail}'`)
        await pgClient.query(`ALTER TABLE "BlockingDeviceDataRaw" ALTER COLUMN "blockingDeviceImportId" SET DEFAULT '${blockingDevice.id}'`)

        const sqlCopy = `
            COPY "BlockingDeviceDataRaw" (
              "customerId",
              "deviceId",
              "imei",
              "serial",
              "locked",
              "expectedLockStatus",
              "lockType",
              "status",
              "isActivated",
              "previousStatus",
              "previousStatusChangedOn",
              "make",
              "model",
              "type",
              "deleted",
              "activatedDeviceDeleted",
              "registeredOn",
              "enrolledOn",
              "unregisteredOn",
              "deletedOn",
              "activationDate",
              "billable",
              "billedDate",
              "lastConnectedAt",
              "nextLockDate",
              "appVersion",
              "gettingStartedClicked",
              "additionalSetupCompleted"
            )
            FROM STDIN WITH (FORMAT CSV, NULL 'NA')
          `

        const ingestStream = pgClient.query(copyFrom(sqlCopy))

        await pipeline(sourceStream, ingestStream)

        console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`)
      } catch (error) {
        console.log(error)
      } finally {
        try {
          fs.unlinkSync(file.path)
          fs.unlinkSync(`${file.path}_prepared`)
        } catch (error) {
          console.error(error)
        }
      }
    }

    await pgClient.query(`ALTER TABLE "BlockingDeviceDataRaw" ALTER COLUMN "customerEmail" DROP DEFAULT`)
    await pgClient.query(`ALTER TABLE "BlockingDeviceDataRaw" ALTER COLUMN "blockingDeviceImportId" DROP DEFAULT`)
    await pgClient.end()

    const elapsedTime = this.getTimeElapsedFromDate(startTime)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime - minutes * 60

    console.log(`[!] Execution time: ${minutes} min ${seconds} sec`)

    await prismaClient.blockingDeviceImportLogProcess.update({
      where: { id: importStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 1 */

    ///////////

    let lastBlockingDeviceImported = null

    lastBlockingDeviceImported = await prismaClient.blockingDeviceVariable.upsert({
      where: {
        name: 'lastBlockingDeviceImported'
      },
      update: {
        value: blockingDevice.id
      },
      create: {
        name: 'lastBlockingDeviceImported',
        key: 'blockingDeviceImportId',
        value: blockingDevice.id
      }
    })

    ///////////

    const { id } = blockingDevice

    return { id }
  }

  getBillableCustomersQuery = (email: string, deviceType: string, fromDate: Date, toDate: Date) => {
    return prismaClient.blockingDeviceDataStepOne.count({
      where: {
        customerEmail: email,
        type: deviceType,
        billableCalculated: true,
        billedDate: {
          gte: fromDate,
          lte: toDate,
        }
      }
    })
  }

  getNonBillableCustomersQuery = (email: string, deviceType: string, fromDate: Date, toDate: Date) => {
    return prismaClient.blockingDeviceDataStepOne.count({
      where: {
        customerEmail: email,
        type: deviceType,
        billableCalculated: false,
        billedDate: {
          gte: fromDate,
          lte: toDate,
        }
      }
    })
  }

  getCountOfSkuStartAndSkuEndQuery = (name: string, email: string, skuStart: string | null, skuEnd: string | null) => {
    const intervalStart = (skus.find(sku => sku.name === skuStart))?.intervalStart
    const intervalEnd = (skus.find(sku => sku.name === skuEnd))?.intervalEnd

    const query = `
        INSERT INTO "BlockingDeviceDataStepTwo"(
            "customerId",
            "deviceId",
            "imei",
            "serial",
            "locked",
            "expectedLockStatus",
            "lockType",
            "status",
            "isActivated",
            "previousStatus",
            "previousStatusChangedOn",
            "make",
            "model",
            "type",
            "deleted",
            "activatedDeviceDeleted",
            "registeredOn",
            "enrolledOn",
            "unregisteredOn",
            "deletedOn",
            "activationDate",
            "billable",
            "lastConnectedAt",
            "nextLockDate",
            "appVersion",
            "gettingStartedClicked",
            "additionalSetupCompleted",
            "customerEmail",
            "blockingDeviceImportId",
            "billableCalculated",
            "billedDate",
            "customerName",
            "skuStartCounter",
            "skuEndCounter"
          )
        SELECT *,
          '${name}',
          ${intervalStart ? `
          CASE
            WHEN (
              SELECT COUNT(*)
              FROM generate_series("billedDate", CURRENT_DATE, '${intervalStart}')
            ) = 1 AND "billableCalculated" = true THEN 1
            ELSE 0
          END,
          ` : 'NULL,'}
          ${intervalStart && intervalEnd ? `
          CASE
            WHEN (
              SELECT COUNT(*)
              FROM generate_series("billedDate", CURRENT_DATE, '${intervalStart}')
            ) > 1 AND "billableCalculated" = true THEN (
              SELECT COUNT(*)
              FROM generate_series("billedDate" + INTERVAL '${intervalStart}', CURRENT_DATE, '${intervalEnd}')
            )
            ELSE 0
          END
          ` : 'NULL'}
        FROM "BlockingDeviceDataStepOne"
        WHERE "customerEmail" = '${email}'
      `

    return query
  }

  async createBlockingDeviceConsolidatedReport (id: string): Promise<any> {
    const deviceTypes = [
      'Android Device',
      'iOS Device',
      'Windows Device',
    ]

    const blockingDevice = await prismaClient.blockingDeviceImport.findUnique({
      where: { id }
    })

    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await pgClient.connect()

    if (!blockingDevice) {
      return
    }

    /* START STEP 0 */

    console.log(`[!] STEP 0: Check for backup`)

    const blockingDeviceLatest = await prismaClient.blockingDeviceImport.findFirst({
      where: {
        reportedAt: {
          gte: new Date(blockingDevice.reportedAt)
        },
        id: {
          not: id
        }
      },
      orderBy: {
        reportedAt: 'desc'
      }
    })

    if (blockingDeviceLatest) {
      const blockingDeviceDataStepTwoBackup = await prismaClient.blockingDeviceDataStepTwoBackup.findFirst({
        where: {
          blockingDeviceImportId: blockingDeviceLatest.id
        }
      })

      if (blockingDeviceDataStepTwoBackup === null) {
        console.log(`[+] Backup table`)

        const backupStatus = await prismaClient.blockingDeviceImportLogProcess.create({
          data: {
            name: 'Backup of latest devices import',
            type: 'backup',
            blockingDeviceImportId: id
          }
        })

        await pgClient.query(`TRUNCATE "BlockingDeviceDataStepTwoBackup"`)
        await pgClient.query(`INSERT INTO "BlockingDeviceDataStepTwoBackup" (SELECT * FROM "BlockingDeviceDataStepTwo")`)

        await prismaClient.blockingDeviceImportLogProcess.update({
          where: { id: backupStatus.id },
          data: {
            finishedAt: new Date(),
          }
        })
      }
    }

    /* END STEP 0 */

    /* START STEP 1 */

    console.log(`[!] STEP 1: Calculate billable`)

    const calculateBillableStatus = await prismaClient.blockingDeviceImportLogProcess.create({
      data: {
        name: 'Calculate billable',
        type: 'calculate-billable',
        blockingDeviceImportId: id
      }
    })

    await pgClient.query(`TRUNCATE "BlockingDeviceDataStepOne"`)
    await pgClient.query(`TRUNCATE "BlockingDeviceDataStepTwo"`)

    const query = `
      INSERT INTO "BlockingDeviceDataStepOne"(
          "customerId",
          "deviceId",
          "imei",
          "serial",
          "locked",
          "expectedLockStatus",
          "lockType",
          "status",
          "isActivated",
          "previousStatus",
          "previousStatusChangedOn",
          "make",
          "model",
          "type",
          "deleted",
          "activatedDeviceDeleted",
          "registeredOn",
          "enrolledOn",
          "unregisteredOn",
          "deletedOn",
          "activationDate",
          "billable",
          "lastConnectedAt",
          "nextLockDate",
          "appVersion",
          "gettingStartedClicked",
          "additionalSetupCompleted",
          "customerEmail",
          "blockingDeviceImportId",
          "billedDate",
          "billableCalculated"
        )
          SELECT *,
            CASE WHEN "billedDate" IS NOT NULL THEN true
                ELSE false
            END AS "billableCalculated"
          FROM "BlockingDeviceDataRaw"
    `

    // linea 462 que se basa en billable para calcular billableCalculated
    //  CASE WHEN "billable" = 'True' OR ("billable" = 'False' AND "status" = 'Enrolled') THEN true

    // linea 462 que se basa en billedDate para calcular billableCalculated
    //  CASE WHEN "billedDate" IS NOT NULL THEN true

    await pgClient.query(query)

    await prismaClient.blockingDeviceImportLogProcess.update({
      where: { id: calculateBillableStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 1 */

    /* START STEP 2 */

    console.log(`[!] STEP 2: Fix null in imei column`)

    const fixImeiStatus = await prismaClient.blockingDeviceImportLogProcess.create({
      data: {
        name: 'Fix null in imei column',
        type: 'fix-imei',
        blockingDeviceImportId: id
      }
    })

    const queryToFixNull = `UPDATE public."BlockingDeviceDataStepOne" SET "imei" = NULL WHERE "imei" = E'null\n'`

    await pgClient.query(queryToFixNull)

    await prismaClient.blockingDeviceImportLogProcess.update({
      where: { id: fixImeiStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 2 */

    /* START STEP 3 */

    console.log(`[!] STEP 3: Calculate consolidated`)

    const calculateConsolidatedStatus = await prismaClient.blockingDeviceImportLogProcess.create({
      data: {
        name: 'Calculate consolidated',
        type: 'calculate-consolidated',
        blockingDeviceImportId: id
      }
    })

    const baseDate = blockingDevice?.reportedAt ? new Date(blockingDevice.reportedAt) : new Date()
    const lastWeekDate = new Date(baseDate.getTime() - (60 * 60 * 24 * 7 * 1000))
    const lastFortnightDate = new Date(baseDate.getTime() - (60 * 60 * 24 * 15 * 1000))
    // console.log({ baseDate })
    // console.log({ lastWeekDate })
    // console.log({ lastFortnightDate })

    const blockingDeviceConsolidatedReportData = []

    const customers = await prismaClient.customer.findMany({ orderBy: { name: 'asc' } })
    const totalCustomers = customers.length

    for (const [index, { name, email, skuStart, skuEnd }] of customers.entries()) {
      console.log(`[!] Customer ${index + 1}/${totalCustomers}: ` + email)
      // console.log(`[+] SKU Start : ` + skuStart)
      // console.log(`[+] SKU End   : ` + skuEnd)

      await pgClient.query(this.getCountOfSkuStartAndSkuEndQuery(name, email, skuStart, skuEnd))

      for (const deviceType of deviceTypes) {
        // console.log(`[!] Device type : ` + deviceType)

        const billableQuery = prismaClient.blockingDeviceDataStepOne.count({
          where: {
            customerEmail: email,
            type: deviceType,
            billableCalculated: true
          }
        })
        const nonBillableQuery = prismaClient.blockingDeviceDataStepOne.count({
          where: {
            customerEmail: email,
            type: deviceType,
            billableCalculated: false
          }
        })
        const billableWeeklyQuery = this.getBillableCustomersQuery(email, deviceType, lastWeekDate, baseDate)
        const nonBillableWeeklyQuery = this.getNonBillableCustomersQuery(email, deviceType, lastWeekDate, baseDate)
        const billableBiweeklyQuery = this.getBillableCustomersQuery(email, deviceType, lastFortnightDate, baseDate)
        const nonBillableBiweeklyQuery = this.getNonBillableCustomersQuery(email, deviceType, lastFortnightDate, baseDate)

        const skusCounterQuery = prismaClient.blockingDeviceDataStepTwo.aggregate({
          where: {
            customerEmail: email,
            type: deviceType
          },
          _sum: {
            skuStartCounter: true,
            skuEndCounter: true
          },
        })

        const [
          billable,
          nonBillable,
          billableWeekly,
          nonBillableWeekly,
          billableBiweekly,
          nonBillableBiweekly,
          skusCounter
        ] = await prismaClient.$transaction([
          billableQuery,
          nonBillableQuery,
          billableWeeklyQuery,
          nonBillableWeeklyQuery,
          billableBiweeklyQuery,
          nonBillableBiweeklyQuery,
          skusCounterQuery
        ])

        blockingDeviceConsolidatedReportData.push({
          customerName: name,
          customerEmail: email,
          billable,
          nonBillable,
          billableWeekly,
          nonBillableWeekly,
          billableBiweekly,
          nonBillableBiweekly,
          deviceType,
          skuStartCounter: skusCounter._sum.skuStartCounter ?? 0,
          skuEndCounter: skusCounter._sum.skuEndCounter ?? 0,
          blockingDeviceImportId: id
        })
      }
    }

    await prismaClient.blockingDeviceConsolidatedReport.createMany({
      data: blockingDeviceConsolidatedReportData,
    })

    await prismaClient.blockingDeviceImportLogProcess.update({
      where: { id: calculateConsolidatedStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 3 */

    /* START STEP 4 */

    console.log(`[!] STEP 4: Get consolidated history`)

    const getConsolidatedHistoryStatus = await prismaClient.blockingDeviceImportLogProcess.create({
      data: {
        name: 'Get consolidated history',
        type: 'get-consolidated-history',
        blockingDeviceImportId: id
      }
    })

    await pgClient.query(`TRUNCATE "BlockingDeviceConsolidatedHistory" RESTART IDENTITY;
    `)

    const queryConsolidateHistory = `
      INSERT INTO "BlockingDeviceConsolidatedHistory"(
          "customerName",
          "enrolldeDate",
          "billableDelta"
        )
      SELECT "customerName",
        "billedDate",
        COUNT("deviceId")
      FROM "BlockingDeviceDataStepTwo"
      WHERE "billableCalculated" IS TRUE
      GROUP BY "customerName",
        "billedDate"
      ORDER BY "billedDate" ASC
    `

    await pgClient.query(queryConsolidateHistory)

    await prismaClient.blockingDeviceImportLogProcess.update({
      where: { id: getConsolidatedHistoryStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 4 */

    await pgClient.end()

    return {
      status: 'success'
    }
  }

  async getBlockingDeviceConsolidatedReport (id: string, deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const blockingDeviceConsolidatedReportQuery = prismaClient.blockingDeviceConsolidatedReport.groupBy({
      where: type ? {
        blockingDeviceImportId: id,
        deviceType: type
      } : { blockingDeviceImportId: id },
      by: ['customerName'],
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
        skuStartCounter: true,
        skuEndCounter: true,
      },
      orderBy: {
        customerName: 'asc'
      }
    })

    const blockingDeviceConsolidatedReportTotalsQuery = prismaClient.blockingDeviceConsolidatedReport.aggregate({
      where: type ? {
        blockingDeviceImportId: id,
        deviceType: type
      } : { blockingDeviceImportId: id },
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
        skuStartCounter: true,
        skuEndCounter: true,
      }
    })

    const [
      blockingDeviceConsolidatedReport,
      blockingDeviceConsolidatedReportTotals
    ] = await prismaClient.$transaction([
      blockingDeviceConsolidatedReportQuery,
      blockingDeviceConsolidatedReportTotalsQuery
    ])

    const customers = blockingDeviceConsolidatedReport?.map(({ _sum, customerName }) => {
      return {
        customerName,
        ..._sum
      }
    })

    const totals = {
      ...blockingDeviceConsolidatedReportTotals._sum,
    }

    const firstBlockingDeviceDataStepTwo = await prismaClient.blockingDeviceDataStepTwo.findFirst({
      where: {
        blockingDeviceImportId: id
      }
    })

    const firstBlockingDeviceDataStepTwoBackup = await prismaClient.blockingDeviceDataStepTwoBackup.findFirst({
      where: {
        blockingDeviceImportId: id
      }
    })

    const allowDownloadCustomerReport = (firstBlockingDeviceDataStepTwo || firstBlockingDeviceDataStepTwoBackup) ? true : false

    const extra = { allowDownloadCustomerReport }

    return {
      customers,
      totals,
      extra
    }
  }

  async getBlockingDeviceConsolidatedReportFile (id: string, deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const blockingDeviceConsolidatedReportQuery = prismaClient.blockingDeviceConsolidatedReport.groupBy({
      where: type ? {
        blockingDeviceImportId: id,
        deviceType: type
      } : { blockingDeviceImportId: id },
      by: ['customerName'],
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
        skuStartCounter: true,
        skuEndCounter: true,
      },
      orderBy: {
        customerName: 'asc'
      }
    })

    const blockingDeviceConsolidatedReportTotalsQuery = prismaClient.blockingDeviceConsolidatedReport.aggregate({
      where: type ? {
        blockingDeviceImportId: id,
        deviceType: type
      } : { blockingDeviceImportId: id },
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
        skuStartCounter: true,
        skuEndCounter: true,
      }
    })

    const [
      blockingDeviceConsolidatedReport,
      blockingDeviceConsolidatedReportTotals
    ] = await prismaClient.$transaction([
      blockingDeviceConsolidatedReportQuery,
      blockingDeviceConsolidatedReportTotalsQuery
    ])

    const data = []

    for (const { _sum, customerName } of blockingDeviceConsolidatedReport) {
      data.push({
        customerName,
        ..._sum
      })
    }

    data.push({
      customerName: 'Totales',
      ...blockingDeviceConsolidatedReportTotals?._sum
    })

    const XLSX = require('xlsx')

    const heading = [['Cliente', 'Facturables', 'No Facturables', 'APS', 'APQ', 'SKU Start', 'SKU End']];

    const workBook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(workSheet, heading)
    XLSX.utils.sheet_add_json(workSheet, data, { origin: 'A2', skipHeader: true })
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Consolidado')

    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    const blockingDevice = await prismaClient.blockingDeviceImport.findUnique({
      where: {
        id
      }
    })

    const reportDate = blockingDevice?.reportedAt?.toISOString()?.slice(0, 10)

    const fileName = `Consolidado ${deviceType} - ${reportDate}.xlsx`

    return { buffer, fileName }
  }

  async getCustomerReportFile (id: string, name: string, deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const firstBlockingDeviceDataStepTwo = await prismaClient.blockingDeviceDataStepTwo.findFirst({
      where: {
        blockingDeviceImportId: id
      }
    })

    const firstBlockingDeviceDataStepTwoBackup = await prismaClient.blockingDeviceDataStepTwoBackup.findFirst({
      where: {
        blockingDeviceImportId: id
      }
    })

    if (!firstBlockingDeviceDataStepTwo && !firstBlockingDeviceDataStepTwoBackup) {
      return
    }

    const sourceTable = firstBlockingDeviceDataStepTwo
      ? 'BlockingDeviceDataStepTwo'
      : 'BlockingDeviceDataStepTwoBackup'

    const { to: copyTo } = require('pg-copy-streams')

    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await pgClient.connect()

    const fs = require('node:fs')
    const crypto = require('node:crypto')
    const path = require('node:path')

    const customer = await prismaClient.customer.findFirst({
      where: {
        name
      }
    })

    await pgClient.query(`TRUNCATE "BlockingDeviceCustomerReport"`)

    const query = `
      INSERT INTO "BlockingDeviceCustomerReport"(
          "deviceId",
          "imei",
          "serial",
          "locked",
          "expectedLockStatus",
          "lockType",
          "status",
          "isActivated",
          "previousStatus",
          "previousStatusChangedOn",
          "make",
          "model",
          "type",
          "deleted",
          "activatedDeviceDeleted",
          "registeredOn",
          "enrolledOn",
          "unregisteredOn",
          "deletedOn",
          "activationDate",
          "billable",
          "lastConnectedAt",
          "nextLockDate",
          "appVersion",
          "gettingStartedClicked",
          "additionalSetupCompleted",
          "billableText"
          ${customer?.sku3m ? `,"sku3mCounter"` : ''}
          ,"skuStartCounter",
          "skuEndCounter",
          "billedDate"
        )
      SELECT "deviceId",
        "imei",
        "serial",
        "locked",
        "expectedLockStatus",
        "lockType",
        "status",
        "isActivated",
        "previousStatus",
        "previousStatusChangedOn",
        "make",
        "model",
        "type",
        "deleted",
        "activatedDeviceDeleted",
        "registeredOn",
        "enrolledOn",
        "unregisteredOn",
        "deletedOn",
        "activationDate",
        "billable",
        "lastConnectedAt",
        "nextLockDate",
        "appVersion",
        "gettingStartedClicked",
        "additionalSetupCompleted",
        CASE WHEN "billableCalculated" = true THEN 'Facturable'
        ELSE 'Sin costo'
        END
        ${customer?.sku3m ? `,(SELECT COUNT("3m") FROM generate_series("billedDate", CURRENT_DATE, '3 month') "3m")` : ''}
        ,"skuStartCounter",
        "skuEndCounter",
        "billedDate"
        FROM "${sourceTable}"
        WHERE "customerEmail" = '${customer?.email}'
      ${type !== null ? `AND "type" = '${type}'` : ''}
    `

    await pgClient.query(query)

    const filePath = path.resolve(`./tmp/report-${crypto.randomBytes(4).readUInt32LE(0)}`)
    const sqlCopy = `
      COPY (
        SELECT "deviceId" AS "device_id",
          "imei",
          "serial" AS "serial_no",
          "locked",
          "expectedLockStatus" AS "expected_lock_status",
          "lockType" AS "lock_type",
          "status" AS "estado",
          "isActivated" AS "is_activated",
          "previousStatus" AS "previous_status",
          "previousStatusChangedOn" AS "previous_status_changed_on",
          "make",
          "model",
          "type" AS "tipo",
          "deleted",
          "activatedDeviceDeleted" AS "activated_device_deleted",
          "registeredOn" AS "registered_on",
          "enrolledOn" AS "enrolled_on",
          "unregisteredOn" AS "unregistered_on",
          "deletedOn" AS "deleted_on",
          "activationDate" AS "activation_date",
          "billable",
          "lastConnectedAt" AS "last_connected_at",
          "nextLockDate" AS "next_lock_date",
          "appVersion" AS "app_version",
          "gettingStartedClicked" AS "getting_started_clicked",
          "additionalSetupCompleted" AS "additional_setup_completed",
          "billableText" AS "facturables"
          ${customer?.sku3m ? `,"sku3mCounter" AS "3m"` : ''}
          ,"skuStartCounter" AS "sku_start",
          "skuEndCounter" AS "sku_end",
          "billedDate" AS "billed_date"
        FROM "BlockingDeviceCustomerReport"
        ORDER BY "deviceId"
      ) TO STDOUT CSV DELIMITER ';' HEADER NULL 'NA'
    `

    const outStream = pgClient.query(copyTo(sqlCopy))
    const writeStream = fs.createWriteStream(filePath)

    await pipeline(outStream, writeStream)

    await pgClient.end()

    const blockingDevice = await prismaClient.blockingDeviceImport.findUnique({
      where: {
        id
      }
    })

    const reportDate = blockingDevice?.reportedAt?.toISOString()?.slice(0, 10)

    const fileName = `Reporte ${deviceType} - ${name} - ${reportDate}.csv`

    return { filePath, fileName }
  }

  async listBlockingReport ({ perPage = 10, page = 0, q = '', pagination = true, fields = ['id', 'reportedAt', 'logProcess', 'logFile'], includeConsolidated = true }: ListBlockingReportDTO): Promise<Option<ListBlockingReportResponseDTO>> {
    const reportsQuery = prismaClient.blockingDeviceImport.findMany({
      skip: pagination ? perPage * page : undefined,
      take: pagination ? perPage : undefined,

      where: includeConsolidated
        ? {}
        : {
          NOT: [
            {
              consolidated: {
                none: {
                  id: undefined
                }
              }
            }
          ]
        },

      select: {
        id: true,
        reportedAt: true,
        logProcess: {
          select: {
            createdAt: true,
            finishedAt: true
          }
        },
        logFile: {
          select: {
            size: true
          }
        },
        _count: {
          select: {
            consolidated: true
          }
        },
      },

      orderBy: {
        reportedAt: 'desc'
      }
    })

    if (pagination) {
      const countQuery = prismaClient.blockingDeviceImport.count()

      const latestReportQuery = prismaClient.blockingDeviceVariable.findUnique({
        where: {
          name: 'lastBlockingDeviceImported'
        }
      })

      const [
        reports,
        total,
        latestReport
      ] = await prismaClient.$transaction([
        reportsQuery,
        countQuery,
        latestReportQuery
      ])

      const data = reports.map((report: any) => {
        const newReport = Object.keys(report).reduce((object: any, key: string) => {
          if (fields.includes(key)) {
            object[key] = report[key];
          }
          return object;
        }, {})

        return {
          ...newReport,
          isConsolidated: report._count.consolidated > 0,
          isLatestImported: report.id === latestReport?.value
        }
      })

      return { total, page, perPage, data }
    }

    const [reports] = await prismaClient.$transaction([reportsQuery])

    const data = reports.map((report: any) => {
      return Object.keys(report).reduce((object: any, key: string) => {
        if (fields.includes(key)) {
          object[key] = report[key];
        }
        return object;
      }, {})
    })

    return { data }
  }

  async getBlockingDevice (id: string): Promise<any> {
    const blockingDevice = await prismaClient.blockingDeviceImport.findUnique({
      where: { id },

      include: {
        logProcess: {
          select: {
            createdAt: true,
            finishedAt: true,
          }
        },
        logFile: {
          select: {
            size: true
          }
        },
        _count: {
          select: {
            consolidated: true
          }
        },
      }
    })

    if (blockingDevice) {
      const { _count, ...newCuovoReport } = blockingDevice
      const data = {
        ...newCuovoReport,
        isConsolidated: _count.consolidated > 0
      }

      return data
    }
  }

  async getBlockingDeviceImportLog (id: string, type: string): Promise<any> {
    if (type === 'process') {
      return await prismaClient.blockingDeviceImportLogProcess.findMany({
        where: { blockingDeviceImportId: id },
        select: {
          name: true,
          createdAt: true,
          finishedAt: true,
        },
        orderBy: {
          createdAt: 'asc'
        }
      })
    }

    if (type === 'file') {
      return await prismaClient.blockingDeviceImportLogFile.findMany({
        where: { blockingDeviceImportId: id },
        select: {
          originalName: true,
          mimeType: true,
          size: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })
    }
  }
}
