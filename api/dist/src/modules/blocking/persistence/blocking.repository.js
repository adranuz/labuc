"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const prisma_client_1 = __importDefault(require("../../common/persistence/prisma-client"));
// import pgClient from '../../common/persistence/pg-client'
const promises_1 = require("node:stream/promises");
class BlockingRepository {
    constructor() {
        this.toDate = (datetime) => {
            if (datetime === 'NA')
                return null;
            const date = datetime.slice(0, 8);
            const parts = date.split('-');
            const formatedDate = `20${parts[2]}-${parts[1]}-${parts[0]}`;
            return new Date(formatedDate);
        };
        this.getTimeElapsedFromDate = (datetime) => {
            const timeTaken = new Date().getTime() - datetime.getTime();
            const timeTakenInSeconds = timeTaken / 1000;
            return timeTakenInSeconds;
        };
        this.getBillableCustomersQuery = (email, fromDate, toDate) => {
            return prisma_client_1.default.blockingDevice.count({
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
            });
        };
        this.getNonBillableCustomersQuery = (email, fromDate, toDate) => {
            return prisma_client_1.default.blockingDevice.count({
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
            });
        };
    }
    async importBlocking({ files, truncate }) {
        console.log(truncate);
        console.log('pgClient.connect()');
        const pgClient = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await pgClient.connect();
        const { Readable } = require('stream');
        const { from: copyFrom } = require('pg-copy-streams');
        if (truncate === 'true') {
            await pgClient.query(`TRUNCATE "BlockingDevice"`);
            await pgClient.query(`TRUNCATE "ActivationReport"`);
        }
        const startTime = new Date();
        console.log(`[!] Start time: ${startTime}`);
        for (const file of files) {
            const content = file.buffer.toString('utf8').split('\n');
            const customerEmail = content[1].split(',')[0];
            const lines = content.slice(4, -1);
            const data = lines.join('\n');
            const buffer = Buffer.from(data);
            const sourceStream = Readable.from(buffer);
            try {
                console.log('[!] Customer: ' + customerEmail + ' ' + lines.length);
                await pgClient.query(`SET datestyle = dmy`);
                await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" SET DEFAULT '${customerEmail}'`);
                const sqlCopy = `COPY "BlockingDevice" ("customerId","deviceId","imei","serial","locked","lockType","status","isActivated","previousStatus","previousStatusChangedOn","make","model","type","deleted","activatedDeviceDeleted","registeredOn","enrolledOn","unregisteredOn","deletedOn","activationDate","billable","lastConnectedAt","nextLockDate","appVersion") FROM STDIN WITH (FORMAT CSV, NULL 'NA')`;
                const ingestStream = pgClient.query(copyFrom(sqlCopy));
                await (0, promises_1.pipeline)(sourceStream, ingestStream);
                console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`);
            }
            finally {
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
        await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" DROP DEFAULT`);
        const elapsedTime = this.getTimeElapsedFromDate(startTime);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime - minutes * 60;
        console.log(`[!] Execution time: ${minutes} min ${seconds} sec`);
        console.log('pgClient.end()');
        await pgClient.end();
        return {
            status: 'success'
        };
    }
    async reportBlocking() {
        const activationReportData = [];
        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 7 * 1000));
        const lastFortnightDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 15 * 1000));
        const customers = await prisma_client_1.default.customer.findMany();
        for (const { name, email } of customers) {
            console.log(email);
            const billableQuery = prisma_client_1.default.blockingDevice.count({
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
            });
            const nonBillableQuery = prisma_client_1.default.blockingDevice.count({
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
            });
            const billableWeeklyQuery = this.getBillableCustomersQuery(email, lastWeekDate, currentDate);
            const nonBillableWeeklyQuery = this.getNonBillableCustomersQuery(email, lastWeekDate, currentDate);
            const billableBiweeklyQuery = this.getBillableCustomersQuery(email, lastFortnightDate, currentDate);
            const nonBillableBiweeklyQuery = this.getNonBillableCustomersQuery(email, lastFortnightDate, currentDate);
            const [billable, nonBillable, billableWeekly, nonBillableWeekly, billableBiweekly, nonBillableBiweekly,] = await prisma_client_1.default.$transaction([
                billableQuery,
                nonBillableQuery,
                billableWeeklyQuery,
                nonBillableWeeklyQuery,
                billableBiweeklyQuery,
                nonBillableBiweeklyQuery,
            ]);
            activationReportData.push({
                customerName: name,
                customerEmail: email,
                billable,
                nonBillable,
                billableWeekly,
                nonBillableWeekly,
                billableBiweekly,
                nonBillableBiweekly,
            });
        }
        const activationReport = await prisma_client_1.default.activationReport.createMany({
            data: activationReportData,
        });
        return {
            status: 'success'
        };
    }
    async getActivationReport() {
        const activationReportQuery = prisma_client_1.default.activationReport.groupBy({
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
        });
        const activationReportTotalsQuery = prisma_client_1.default.activationReport.aggregate({
            _sum: {
                billable: true,
                nonBillable: true,
                billableWeekly: true,
                billableBiweekly: true,
            }
        });
        const [activationReport, activationReportTotals,] = await prisma_client_1.default.$transaction([
            activationReportQuery,
            activationReportTotalsQuery,
        ]);
        return {
            activationReport,
            activationReportTotals,
        };
    }
    async getActivationReportFile() {
        const activationReportQuery = prisma_client_1.default.activationReport.groupBy({
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
        });
        const activationReportTotalsQuery = prisma_client_1.default.activationReport.aggregate({
            _sum: {
                billable: true,
                nonBillable: true,
                billableWeekly: true,
                billableBiweekly: true,
            }
        });
        const [activationReport, activationReportTotals,] = await prisma_client_1.default.$transaction([
            activationReportQuery,
            activationReportTotalsQuery,
        ]);
        const data = [];
        for (const { _sum, customerName } of activationReport) {
            data.push({
                customerName,
                ..._sum,
            });
        }
        data.push({
            customerName: 'Totales',
            ...activationReportTotals === null || activationReportTotals === void 0 ? void 0 : activationReportTotals._sum
        });
        const XLSX = require('xlsx');
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte');
        const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' });
        return buffer;
    }
    async getCustomerReport(name) {
        const XLSX = require('xlsx');
        const customerReportData = [];
        const customer = await prisma_client_1.default.customer.findFirst({
            where: {
                name
            }
        });
        const blockingDevices = await prisma_client_1.default.blockingDevice.findMany({
            where: {
                customerEmail: customer === null || customer === void 0 ? void 0 : customer.email
            }
        });
        for (const blockingDevice of blockingDevices) {
            const { deviceId, imei, serial, locked, lockType, status, previousStatus, previousStatusChangedOn, make, model, type, deleted, activatedDeviceDeleted, registeredOn, enrolledOn, unregisteredOn, deletedOn, activationDate, billable, } = blockingDevice;
            const billableText = billable === 'True' || (status === 'Enrolled' && billable === 'False')
                ? 'Facturable'
                : 'Sin costo';
            customerReportData.push({
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
            });
        }
        const workSheet = XLSX.utils.json_to_sheet(customerReportData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Reporte');
        const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' });
        return buffer;
    }
}
exports.default = BlockingRepository;
