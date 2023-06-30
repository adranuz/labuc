import { Client } from 'pg'

import prismaClient from '../../common/persistence/prisma-client'
// import pgClient from '../../common/persistence/pg-client'
import { pipeline } from 'node:stream/promises'

import { ImportBlockingDTO, ImportBlockingResponseDTO } from '../dto/blocking.dto'
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
    console.log(truncate)
    console.log('pgClient.connect()')
    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL
    })
    await pgClient.connect()

    const { Readable } = require('stream')
    const { from: copyFrom } = require('pg-copy-streams')

    if (truncate === 'true') {
      await pgClient.query(`TRUNCATE "BlockingDevice"`)
      await pgClient.query(`TRUNCATE "ActivationReport"`)
    }

    const startTime = new Date()

    console.log(`[!] Start time: ${startTime}`)

    for (const file of files) {
      const content = file.buffer.toString('utf8').split('\n')
      const customerEmail = content[1].split(',')[0]
      const lines = content.slice(4, -1)
      const data = lines.join('\n')
      const buffer = Buffer.from(data)
      const sourceStream = Readable.from(buffer)

      try {
        console.log('[!] Customer: ' + customerEmail + ' ' + lines.length)

        const query = await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" SET DEFAULT '${customerEmail}'`)

        const sqlCopy = `COPY "BlockingDevice" ("customerId","deviceId","imei","serial","locked","lockType","status","isActivated","previousStatus","previousStatusChangedOn","make","model","type","deleted","activatedDeviceDeleted","registeredOn","enrolledOn","unregisteredOn","deletedOn","activationDate","billable","lastConnectedAt","nextLockDate","appVersion") FROM STDIN WITH (FORMAT CSV, NULL 'NA')`

        const ingestStream = pgClient.query(copyFrom(sqlCopy))

        await pipeline(sourceStream, ingestStream)

        console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`)
      } finally {
        // console.log('finally')
      }

      // const foundCustomer = await prismaClient.customer.findFirst({
      //   where: { email: customerEmail },
      // })

      // if (!foundCustomer) {
      //   console.log(`[!] New customer: ${customerEmail}`)
      // }

      // console.log('[!] Customer: ' + customerEmail + ' ' + lines.length)

      // const customerId = foundCustomer?.id || null
    }

    const query = await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" DROP DEFAULT`)

    const elapsedTime = this.getTimeElapsedFromDate(startTime)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime - minutes * 60

    console.log(`[!] Execution time: ${minutes} min ${seconds} sec`)

    console.log('pgClient.end()')
    await pgClient.end()

    return {
      status: 'success'
    }
  }

  getBillableCustomersQuery = (email: string, fromDate: Date, toDate: Date) => {
    return prismaClient.blockingDevice.count({
      where: {
        AND: [
          { customerEmail: email },
          {
            enrolledOn: {
              gte: fromDate,
              lte: toDate,
            }
          },
        ],
        OR: [
          {
            billable: 'True'
          },
          {
            status: 'Enrolled',
            billable: 'False'
          },
        ]
      }
    })
  }

  getNonBillableCustomersQuery = (email: string, fromDate: Date, toDate: Date) => {
    return prismaClient.blockingDevice.count({
      where: {
        AND: [
          { customerEmail: email },
          {
            enrolledOn: {
              gte: fromDate,
              lte: toDate,
            }
          },
        ],
        OR: [
          {
            NOT: [
              {
                OR: [
                  {
                    billable: 'True'
                  },
                  {
                    status: 'Enrolled',
                    billable: 'False'
                  },
                ]
              }
            ]
          },
          {
            billable: {
              equals: null
            }
          },
        ]
      }
    })
  }

  async reportBlocking(): Promise<any> {
    const activationReportData = []
    const currentDate = new Date()
    const lastWeekDate = new Date(currentDate.getTime() - (60*60*24*7*1000))
    const lastFortnightDate = new Date(currentDate.getTime() - (60*60*24*15*1000))

    const customers = await prismaClient.customer.findMany()

    for (const { name, email } of customers) {
      console.log(email)
      const billableQuery = prismaClient.blockingDevice.count({
        where: {
          customerEmail: email,
          OR: [
            {
              billable: 'True'
            },
            {
              status: 'Enrolled',
              billable: 'False'
            },
          ]
        }
      })
      const nonBillableQuery = prismaClient.blockingDevice.count({
        where: {
          customerEmail: email,
          OR: [
            {
              NOT: [
                {
                  OR: [
                    {
                      billable: 'True'
                    },
                    {
                      status: 'Enrolled',
                      billable: 'False'
                    },
                  ]
                }
              ]
            },
            {
              billable: {
                equals: null
              }
            },
          ]
      }
      })
      const billableWeeklyQuery = this.getBillableCustomersQuery(email, lastWeekDate, currentDate)
      const nonBillableWeeklyQuery = this.getNonBillableCustomersQuery(email, lastWeekDate, currentDate)
      const billableBiweeklyQuery = this.getBillableCustomersQuery(email, lastFortnightDate, currentDate)
      const nonBillableBiweeklyQuery = this.getNonBillableCustomersQuery(email, lastFortnightDate, currentDate)
  
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
      })
    }

    const activationReport = await prismaClient.activationReport.createMany({
      data: activationReportData,
    })

    return {
      status: 'success'
    }
  }

  async getActivationReport(): Promise<any> {
    const activationReportQuery = prismaClient.activationReport.groupBy({
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

  async getActivationReportFile(): Promise<any> {
    const activationReportQuery = prismaClient.activationReport.groupBy({
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

    const workSheet = XLSX.utils.json_to_sheet(data)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte')
    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    return buffer

  }

  async getCustomerReport(name: string): Promise<any> {
    const XLSX = require('xlsx')

    const customerReportData = []
    
    const customer = await prismaClient.customer.findFirst({
      where: {
        name
      }
    })

    const blockingDevices = await prismaClient.blockingDevice.findMany({
      where: {
        customerEmail: customer?.email
      }
    })

    for (const blockingDevice of blockingDevices) {
      const {
        deviceId,
        imei,
        serial,
        locked,
        lockType,
        status,
        previousStatus,
        previousStatusChangedOn,
        make,
        model,
        type,
        deleted,
        activatedDeviceDeleted,
        registeredOn,
        enrolledOn,
        unregisteredOn,
        deletedOn,
        activationDate,
        billable,
      } = blockingDevice

      const billableText = billable === 'True' || (status === 'Enrolled' && billable === 'False')
        ? 'Facturable'
        : 'Sin costo'

      customerReportData.push(
        {
          deviceId,
          imei,
          serial,
          locked,
          lockType,
          status,
          previousStatus,
          previousStatusChangedOn,
          make,
          model,
          type,
          deleted,
          activatedDeviceDeleted,
          registeredOn,
          enrolledOn,
          unregisteredOn,
          deletedOn,
          activationDate,
          billable,
          billableText
        }
      )
    }

    const workSheet = XLSX.utils.json_to_sheet(customerReportData)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte')
    const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' })

    return buffer
  }
}
