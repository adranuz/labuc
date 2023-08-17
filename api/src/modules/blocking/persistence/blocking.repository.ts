import { Client } from 'pg'

import prismaClient from '../../common/persistence/prisma-client'
import { NuovoReport } from '@prisma/client'

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

  async createBlockingReport ({ files, truncate, reportedAt }: CreateBlockingReportDTO): Promise<CreateBlockingReportResponseDTO> {
    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await pgClient.connect()

    ///////////

    let nuovoReport = null

    nuovoReport = await prismaClient.nuovoReport.findUnique({
      where: {
        reportedAt: new Date(reportedAt)
      },
    }) ?? await prismaClient.nuovoReport.create({
      data: {
        reportedAt: new Date(reportedAt),
      },
      include: {
        logProcess: true,
      }
    })

    if (truncate === 'true') {
      await pgClient.query(`TRUNCATE "BlockingDevice"`)
      await pgClient.query(`TRUNCATE "BlockingDeviceComplete"`)
      await pgClient.query(`TRUNCATE "BlockingDeviceCompleteSku"`)
      await prismaClient.nuovoReportLogProcess.deleteMany({
        where: {
          nuovoReportId: nuovoReport.id
        }
      })
      await prismaClient.nuovoReportLogFile.deleteMany({
        where: {
          nuovoReportId: nuovoReport.id
        }
      })
      await prismaClient.nuovoReportConsolidated.deleteMany({
        where: {
          nuovoReportId: nuovoReport.id
        }
      })
      await prismaClient.nuovoReportLogProcess.create({
        data: {
          name: 'Truncate',
          type: 'truncate',
          createdAt: new Date(),
          finishedAt: new Date(),
          nuovoReportId: nuovoReport.id
        }
      })
    }

    const importStatus = await prismaClient.nuovoReportLogProcess.create({
      data: {
        name: 'Import files',
        type: 'import',
        nuovoReportId: nuovoReport.id
      }
    })

    ///////////

    const { from: copyFrom } = require('pg-copy-streams')
    const fs = require('node:fs')
    const execPromise = util.promisify(exec)

    const startTime = new Date()

    console.log(`[!] Start time: ${startTime}`)

    for (const [index, file] of files.entries()) {
      await prismaClient.nuovoReportLogFile.create({
        data: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          nuovoReportId: nuovoReport.id
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
        await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" SET DEFAULT '${customerEmail}'`)
        await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "nuovoReportId" SET DEFAULT '${nuovoReport.id}'`)

        const sqlCopy = `
            COPY "BlockingDevice" (
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
              "additionalSetupCompleted"
            )
            FROM STDIN WITH (FORMAT CSV, NULL 'NA')
          `

        const ingestStream = pgClient.query(copyFrom(sqlCopy))

        await pipeline(sourceStream, ingestStream)

        console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`)
      } finally {
        try {
          fs.unlinkSync(file.path)
          fs.unlinkSync(`${file.path}_prepared`)
        } catch (error) {
          console.error(error)
        }
      }
    }

    await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" DROP DEFAULT`)
    await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "nuovoReportId" DROP DEFAULT`)
    await pgClient.end()

    const elapsedTime = this.getTimeElapsedFromDate(startTime)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime - minutes * 60

    console.log(`[!] Execution time: ${minutes} min ${seconds} sec`)

    await prismaClient.nuovoReportLogProcess.update({
      where: { id: importStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    ///////////

    let lastNuovoReportImported = null

    lastNuovoReportImported = await prismaClient.nuovoReportInfo.upsert({
      where: {
        name: 'lastNuovoReportImported'
      },
      update: {
        value: nuovoReport.id
      },
      create: {
        name: 'lastNuovoReportImported',
        key: 'nuovoReportId',
        value: nuovoReport.id
      }
    })

    ///////////

    const { id } = nuovoReport

    return { id }
  }

  getBillableCustomersQuery = (email: string, deviceType: string, fromDate: Date, toDate: Date) => {
    return prismaClient.blockingDeviceComplete.count({
      where: {
        customerEmail: email,
        type: deviceType,
        billableCalculated: true,
        enrolledOnOnlyDate: {
          gte: fromDate,
          lte: toDate,
        }
      }
    })
  }

  getNonBillableCustomersQuery = (email: string, deviceType: string, fromDate: Date, toDate: Date) => {
    return prismaClient.blockingDeviceComplete.count({
      where: {
        customerEmail: email,
        type: deviceType,
        billableCalculated: false,
        enrolledOnOnlyDate: {
          gte: fromDate,
          lte: toDate,
        }
      }
    })
  }

  getCountOfSkuStartAndSkuEndQuery = (name: string, email: string, skuStart: string, skuEnd: string) => {
    // console.log(`[+] SKU Start : ` + skuStart)
    // console.log(`[+] SKU End   : ` + skuEnd)

    const intervalStart = (skus.find(sku => sku.name === skuStart))?.intervalStart
    const intervalEnd = (skus.find(sku => sku.name === skuEnd))?.intervalEnd

    const query = `
        INSERT INTO "BlockingDeviceCompleteSku"(
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
            "nuovoReportId",
            "enrolledOnOnlyDate",
            "billableCalculated",
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
              FROM generate_series("enrolledOnOnlyDate", CURRENT_DATE, '${intervalStart}')
            ) = 1 AND "billableCalculated" = true THEN 1
            ELSE 0
          END,
          ` : 'NULL,'}
          ${intervalStart && intervalEnd ? `
          CASE
            WHEN (
              SELECT COUNT(*)
              FROM generate_series("enrolledOnOnlyDate", CURRENT_DATE, '${intervalStart}')
            ) > 1 AND "billableCalculated" = true THEN (
              SELECT COUNT(*)
              FROM generate_series("enrolledOnOnlyDate" + INTERVAL '${intervalStart}', CURRENT_DATE, '${intervalEnd}')
            )
            ELSE 0
          END
          ` : 'NULL'}
        FROM "BlockingDeviceComplete"
        WHERE "customerEmail" = '${email}'
      `

    return query
  }

  async createNuovoReportConsolidated (id: string): Promise<any> {
    const deviceTypes = [
      'Android Device',
      'iOS Device',
      'Windows Device',
    ]

    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await pgClient.connect()

    /* START STEP 1 */

    console.log(`[!] STEP 1: Calculate billable`)

    const calculateBillableStatus = await prismaClient.nuovoReportLogProcess.create({
      data: {
        name: 'Calculate billable',
        type: 'calculate-billable',
        nuovoReportId: id
      }
    })

    const query = `
      INSERT INTO "BlockingDeviceComplete"(
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
          "nuovoReportId",
          "enrolledOnOnlyDate",
          "billableCalculated"
        )
      SELECT *,
        DATE("enrolledOn") as "enrolledOnOnlyDate",
        CASE WHEN "billable" = 'True' OR ("billable" = 'False' AND "status" = 'Enrolled') THEN true
            ELSE false
        END AS "billableCalculated"
      FROM "BlockingDevice"
    `

    await pgClient.query(query)

    await prismaClient.nuovoReportLogProcess.update({
      where: { id: calculateBillableStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 1 */

    /* START STEP 2 */

    console.log(`[!] STEP 2: Fix null in imei column`)

    const fixImeiStatus = await prismaClient.nuovoReportLogProcess.create({
      data: {
        name: 'Fix null in imei column',
        type: 'fix-imei',
        nuovoReportId: id
      }
    })

    const queryToFixNull = `UPDATE public."BlockingDeviceComplete" SET "imei" = NULL WHERE "imei" = E'null\n'`

    await pgClient.query(queryToFixNull)

    await prismaClient.nuovoReportLogProcess.update({
      where: { id: fixImeiStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 2 */

    /* START STEP 3 */

    console.log(`[!] STEP 3: Calculate consolidated`)

    const calculateConsolidatedStatus = await prismaClient.nuovoReportLogProcess.create({
      data: {
        name: 'Calculate consolidated',
        type: 'calculate-consolidated',
        nuovoReportId: id
      }
    })

    const nuovoReport = await prismaClient.nuovoReport.findUnique({
      where: { id }
    })

    const baseDate = nuovoReport?.reportedAt ? new Date(nuovoReport.reportedAt) : new Date()
    const lastWeekDate = new Date(baseDate.getTime() - (60 * 60 * 24 * 7 * 1000))
    const lastFortnightDate = new Date(baseDate.getTime() - (60 * 60 * 24 * 15 * 1000))
    console.log({ baseDate })
    console.log({ lastWeekDate })
    console.log({ lastFortnightDate })

    const nuovoReportConsolidatedData = []

    const customers = await prismaClient.customer.findMany()
    const totalCustomers = customers.length

    for (const [index, { name, email, skuStart, skuEnd }] of customers.entries()) {
      console.log(`[!] Customer ${index + 1}/${totalCustomers}: ` + email)

      if (skuStart && skuEnd) {
        await pgClient.query(this.getCountOfSkuStartAndSkuEndQuery(name, email, skuStart, skuEnd))
      }

      for (const deviceType of deviceTypes) {
        // console.log(`[!] Device type : ` + deviceType)

        const billableQuery = prismaClient.blockingDeviceComplete.count({
          where: {
            customerEmail: email,
            type: deviceType,
            billableCalculated: true
          }
        })
        const nonBillableQuery = prismaClient.blockingDeviceComplete.count({
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

        const skusCounterQuery = prismaClient.blockingDeviceCompleteSku.aggregate({
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

        nuovoReportConsolidatedData.push({
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
          nuovoReportId: id
        })
      }
    }

    await pgClient.end()

    await prismaClient.nuovoReportConsolidated.createMany({
      data: nuovoReportConsolidatedData,
    })

    await prismaClient.nuovoReportLogProcess.update({
      where: { id: calculateConsolidatedStatus.id },
      data: {
        finishedAt: new Date(),
      }
    })

    /* END STEP 3 */

    return {
      status: 'success'
    }
  }

  async getNuovoReportConsolidated (id: string, deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const nuovoReportConsolidatedQuery = prismaClient.nuovoReportConsolidated.groupBy({
      where: type ? {
        nuovoReportId: id,
        deviceType: type
      } : { nuovoReportId: id },
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

    const nuovoReportConsolidatedTotalsQuery = prismaClient.nuovoReportConsolidated.aggregate({
      where: type ? {
        nuovoReportId: id,
        deviceType: type
      } : { nuovoReportId: id },
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
      nuovoReportConsolidated,
      nuovoReportConsolidatedTotals
    ] = await prismaClient.$transaction([
      nuovoReportConsolidatedQuery,
      nuovoReportConsolidatedTotalsQuery
    ])

    const customers = nuovoReportConsolidated?.map(({ _sum, customerName }) => {
      return {
        customerName,
        ..._sum
      }
    })

    const totals = {
      ...nuovoReportConsolidatedTotals._sum,
    }

    return {
      customers,
      totals
    }
  }

  async getNuovoReportConsolidatedFile (id: string, deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const nuovoReportConsolidatedQuery = prismaClient.nuovoReportConsolidated.groupBy({
      where: type ? {
        nuovoReportId: id,
        deviceType: type
      } : { nuovoReportId: id },
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

    const nuovoReportConsolidatedTotalsQuery = prismaClient.nuovoReportConsolidated.aggregate({
      where: type ? {
        nuovoReportId: id,
        deviceType: type
      } : { nuovoReportId: id },
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
      nuovoReportConsolidated,
      nuovoReportConsolidatedTotals
    ] = await prismaClient.$transaction([
      nuovoReportConsolidatedQuery,
      nuovoReportConsolidatedTotalsQuery
    ])

    const data = []

    for (const { _sum, customerName } of nuovoReportConsolidated) {
      data.push({
        customerName,
        ..._sum
      })
    }

    data.push({
      customerName: 'Totales',
      ...nuovoReportConsolidatedTotals?._sum
    })

    const XLSX = require('xlsx')

    const heading = [['Cliente', 'Facturables', 'No Facturables', 'APS', 'APQ', 'SKU Start', 'SKU End']];

    const workBook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(workSheet, heading)
    XLSX.utils.sheet_add_json(workSheet, data, { origin: 'A2', skipHeader: true })
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1')

    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    return buffer
  }

  async getCustomerReportFile (deviceType: string | undefined, name: string): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

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

    await pgClient.query(`TRUNCATE "BlockingDeviceReport"`)

    const query = `
      INSERT INTO "BlockingDeviceReport"(
          "deviceId",
          "imei",
          "serial",
          "locked",
          "lockType",
          "status",
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
          "billableText"
          ${customer?.sku3m ? `,"sku3mCounter"` : ''}
          ,"skuStartCounter",
          "skuEndCounter"
        )
      SELECT "deviceId",
        "imei",
        "serial",
        "locked",
        "lockType",
        "status",
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
        CASE WHEN "billableCalculated" = true THEN 'Facturable'
             ELSE 'Sin costo'
        END
        ${customer?.sku3m ? `,(SELECT COUNT("3m") FROM generate_series("enrolledOn", CURRENT_TIMESTAMP, '3 month') "3m")` : ''}
        ,"skuStartCounter",
        "skuEndCounter"
      FROM "BlockingDeviceCompleteSku"
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
          "lockType" AS "lock_type",
          "status" AS "estado",
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
          "billableText" AS "facturables"
          ${customer?.sku3m ? `,"sku3mCounter" AS "3m"` : ''}
          ,"skuStartCounter" AS "sku_start",
          "skuEndCounter" AS "sku_end"
        FROM "BlockingDeviceReport"
        ORDER BY "deviceId"
      ) TO STDOUT CSV DELIMITER ';' HEADER NULL 'NA'
    `

    const outStream = pgClient.query(copyTo(sqlCopy))
    const writeStream = fs.createWriteStream(filePath)

    await pipeline(outStream, writeStream)

    await pgClient.end()

    return filePath
  }

  async listBlockingReport ({ perPage = 10, page = 0, q = '', pagination = true, fields = ['id', 'reportedAt', 'logProcess', 'logFile'], consolidated = true }: ListBlockingReportDTO): Promise<Option<ListBlockingReportResponseDTO>> {
    const reportsQuery = prismaClient.nuovoReport.findMany({
      skip: pagination ? perPage * page : undefined,
      take: pagination ? perPage : undefined,

      where: consolidated
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
      const countQuery = prismaClient.nuovoReport.count()

      const latestReportQuery = prismaClient.nuovoReportInfo.findUnique({
        where: {
          name: 'lastNuovoReportImported'
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
          isLatest: report.id === latestReport?.value
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

  async getNuovoReport (id: string): Promise<any> {
    const nuovoReport = await prismaClient.nuovoReport.findUnique({
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

    if (nuovoReport) {
      const { _count, ...newCuovoReport } = nuovoReport
      const data = {
        ...newCuovoReport,
        isConsolidated: _count.consolidated > 0
      }

      return data
    }
  }

  async getNuovoReportLog (id: string, type: string): Promise<any> {
    if (type === 'process') {
      return await prismaClient.nuovoReportLogProcess.findMany({
        where: { nuovoReportId: id },
        select: {
          name: true,
          createdAt: true,
          finishedAt: true,
        }
      })
    }

    if (type === 'file') {
      return await prismaClient.nuovoReportLogFile.findMany({
        where: { nuovoReportId: id },
        select: {
          originalName: true,
          mimeType: true,
          size: true
        }
      })
    }
  }
}
