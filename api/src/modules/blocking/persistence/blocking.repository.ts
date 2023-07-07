import { Client } from 'pg'

import prismaClient from '../../common/persistence/prisma-client'

import { pipeline } from 'node:stream/promises'
import { exec } from 'node:child_process'
import util from "node:util"

import Option from '../../common/types/Option.type'
import { ImportBlockingDTO, ImportBlockingResponseDTO, PaginationFilterDTO , PublicImportsDTO} from '../dto/blocking.dto'
import IBlockingRepository from '../service/IBlockingRepository'
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
    const timeTakenInSeconds = timeTaken/1000
    return timeTakenInSeconds
  }

  async importBlocking({ files, truncate }: ImportBlockingDTO): Promise<ImportBlockingResponseDTO> {
    const totalFiles = files.length
    const totalFilesSize = files.map(file => file.size).reduce((accumulator, current) => accumulator + current, 0)

    const importCreated = await prismaClient.blockingDeviceImport.create({
      data: {
        totalFiles,
        totalFilesSize,
        truncate: truncate  === 'true',
      }
    })

    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await pgClient.connect()

    const { from: copyFrom } = require('pg-copy-streams')
    const fs = require('node:fs')
    const execPromise = util.promisify(exec)

    if (truncate === 'true') {
      await pgClient.query(`TRUNCATE "BlockingDevice"`)
      await pgClient.query(`TRUNCATE "BlockingDeviceComplete"`)
      await pgClient.query(`TRUNCATE "ActivationReport"`)
    }

    const startTime = new Date()

    console.log(`[!] Start time: ${startTime}`)

    for (const [index, file] of files.entries()) {
      let customerEmail = ''

      try {
        const {stdout, stderr} = await execPromise(`head -2 ${file.path} | tail -1 | cut -d',' -f1 | xargs echo -n`)
        customerEmail = stdout
      } catch (error) {
        console.log(error)
      }

      try {
        const {stdout, stderr} = await execPromise(`tail -n +5 ${file.path} | head -n -1 > ${file.path}_prepared`)
      } catch (error) {
        console.log(error)
      }

      const sourceStream = fs.createReadStream(`${file.path}_prepared`)

        try {
          console.log(`[!] Customer ${index + 1}: ` + customerEmail)

          await pgClient.query(`SET datestyle = dmy`)
          await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" SET DEFAULT '${customerEmail}'`)

          const sqlCopy = `COPY "BlockingDevice" ("customerId","deviceId","imei","serial","locked","lockType","status","isActivated","previousStatus","previousStatusChangedOn","make","model","type","deleted","activatedDeviceDeleted","registeredOn","enrolledOn","unregisteredOn","deletedOn","activationDate","billable","lastConnectedAt","nextLockDate","appVersion") FROM STDIN WITH (FORMAT CSV, NULL 'NA')`

          const ingestStream = pgClient.query(copyFrom(sqlCopy))

          await pipeline(sourceStream, ingestStream)

          console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`)
        } finally {
          try {
            fs.unlinkSync(file.path)
            fs.unlinkSync(`${file.path}_prepared`)
          } catch(error) {
            console.error(error)
          }
        }
    }

    /////////////

    console.log(`[!] Copy to BlockingDeviceComplete...`)

    const query = `
      INSERT INTO "BlockingDeviceComplete"(
          "customerId",
          "deviceId",
          "imei",
          "serial",
          "locked",
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
          "customerEmail",
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

    console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`)

    //////////

    await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" DROP DEFAULT`)
    await pgClient.end()

    const elapsedTime = this.getTimeElapsedFromDate(startTime)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime - minutes * 60

    console.log(`[!] Execution time: ${minutes} min ${seconds} sec`)

    const importUpdated = await prismaClient.blockingDeviceImport.update({
      where: { id: importCreated.id },
      data: {
        startedAt: startTime,
        finishedAt: new Date(),
      }
    })

    const { id } = importUpdated

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

  async createActivationReport(): Promise<any> {
    const deviceTypes = [
      'Android Device',
      'iOS Device',
      'Windows Device',
    ]
    
    const currentDate = new Date()
    const lastWeekDate = new Date(currentDate.getTime() - (60*60*24*7*1000))
    const lastFortnightDate = new Date(currentDate.getTime() - (60*60*24*15*1000))

    const activationReportData = []

    const customers = await prismaClient.customer.findMany()
    const totalCustomers = customers.length
    
    for (const [index, { name, email }] of customers.entries()) {
      console.log(`[!] Customer ${index + 1}/${totalCustomers}: ` + email)

      for (const deviceType of deviceTypes) {
        console.log(`[!] Device type : ` + deviceType)

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
        const billableWeeklyQuery = this.getBillableCustomersQuery(email, deviceType, lastWeekDate, currentDate)
        const nonBillableWeeklyQuery = this.getNonBillableCustomersQuery(email, deviceType, lastWeekDate, currentDate)
        const billableBiweeklyQuery = this.getBillableCustomersQuery(email, deviceType, lastFortnightDate, currentDate)
        const nonBillableBiweeklyQuery = this.getNonBillableCustomersQuery(email, deviceType, lastFortnightDate, currentDate)
  
        const [
          billable,
          nonBillable,
          billableWeekly,
          nonBillableWeekly,
          billableBiweekly,
          nonBillableBiweekly,
        ] = await prismaClient.$transaction([
          billableQuery,
          nonBillableQuery,
          billableWeeklyQuery,
          nonBillableWeeklyQuery,
          billableBiweeklyQuery,
          nonBillableBiweeklyQuery,
        ])
  
        activationReportData.push({
          customerName: name,
          customerEmail: email,
          billable,
          nonBillable,
          billableWeekly,
          nonBillableWeekly,
          billableBiweekly,
          nonBillableBiweekly,
          deviceType,
        })
      }
    }

    const activationReport = await prismaClient.activationReport.createMany({
      data: activationReportData,
    })

    return {
      status: 'success'
    }
  }

  async getActivationReport(deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const activationReportQuery = prismaClient.activationReport.groupBy({
      where: type ? {
        deviceType: type
      } : {},
      by: ['customerName'],
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
      },
      orderBy: {
        customerName: 'asc'
      }
    })

    const activationReportTotalsQuery = prismaClient.activationReport.aggregate({
      where: type ? {
        deviceType: type
      } : {},
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
      }
    })

    const [
      activationReport,
      activationReportTotals,
    ] = await prismaClient.$transaction([
      activationReportQuery,
      activationReportTotalsQuery,
    ])

    return {
      activationReport,
      activationReportTotals,
    }
  }

  async getActivationReportFile(deviceType: string | undefined): Promise<any> {
    let type = null

    if (deviceType === 'android') {
      type = 'Android Device'
    } else if (deviceType === 'ios') {
      type = 'iOS Device'
    } else if (deviceType === 'windows') {
      type = 'Windows Device'
    }

    const activationReportQuery = prismaClient.activationReport.groupBy({
      where: type ? {
        deviceType: type
      } : {},
      by: ['customerName'],
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
      },
      orderBy: {
        customerName: 'asc'
      }
    })

    const activationReportTotalsQuery = prismaClient.activationReport.aggregate({
      where: type ? {
        deviceType: type
      } : {},
      _sum: {
        billable: true,
        nonBillable: true,
        billableWeekly: true,
        billableBiweekly: true,
      }
    })

    const [
      activationReport,
      activationReportTotals,
    ] = await prismaClient.$transaction([
      activationReportQuery,
      activationReportTotalsQuery,
    ])

    const data = []

    for (const {_sum, customerName} of activationReport) {
      data.push({
        customerName,
        ..._sum,
      })
    }

    data.push({
      customerName: 'Totales',
      ...activationReportTotals?._sum
    })

    const XLSX = require('xlsx')

    const heading = [['Cliente', 'Facturables', 'No Facturables', 'APS', 'APQ']];

    const workBook = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(workSheet, heading)
    XLSX.utils.sheet_add_json(workSheet, data, { origin: 'A2', skipHeader: true })
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1')
    
    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    return buffer
  }

  async getCustomerReportFile(deviceType: string | undefined, name: string): Promise<any> {
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
          "billableText",
          "enrolledOnCount3Months"
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
        END,
        (SELECT COUNT("3m") FROM generate_series("enrolledOn", CURRENT_DATE, '3 month') "3m")
      FROM "BlockingDeviceComplete"
      WHERE "customerEmail" = '${customer?.email}'
      ${type !== null ? `AND "type" = '${type}'` : ''}
    `

    await pgClient.query(query)

    const filePath = path.resolve(`./tmp/report-${crypto.randomBytes(4).readUInt32LE(0)}`)
    const sqlCopy = `COPY (SELECT "deviceId" AS "device_id","imei","serial" AS "serial_no","locked","lockType" AS "lock_type","status" AS "estado","previousStatus" AS "previous_status","previousStatusChangedOn" AS "previous_status_changed_on","make","model","type" AS "tipo","deleted","activatedDeviceDeleted" AS "activated_device_deleted","registeredOn" AS "registered_on","enrolledOn" AS "enrolled_on","unregisteredOn" AS "unregistered_on","deletedOn" AS "deleted_on","activationDate" AS "activation_date","billable","billableText" AS "facturables","enrolledOnCount3Months" AS "3m" FROM "BlockingDeviceReport" ORDER BY "deviceId") TO STDOUT CSV DELIMITER ';' HEADER NULL 'NA'`

    const outStream = pgClient.query(copyTo(sqlCopy))
    const writeStream = fs.createWriteStream(filePath)

    await pipeline(outStream, writeStream)

    await pgClient.end()

    return filePath
  }

  async listImports({perPage = 10, page = 0, q: searchText = ''}: PaginationFilterDTO ): Promise<Option<PublicImportsDTO>> {
    const importsQuery = prismaClient.blockingDeviceImport.findMany({
      skip: Number(perPage) * Number(page),
      take: Number(perPage),
  
      orderBy: {
        createdAt: 'desc'
      },
    })

    const [imports, importsCount] = await prismaClient.$transaction([
      importsQuery,
      prismaClient.blockingDeviceImport.count(),
    ])

    return {
      total: importsCount,
      page: Number(page),
      perPage: Number(perPage),
      data: imports
    }
  }
}
