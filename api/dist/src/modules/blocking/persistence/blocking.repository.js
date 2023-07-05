"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const prisma_client_1 = __importDefault(require("../../common/persistence/prisma-client"));
const promises_1 = require("node:stream/promises");
const node_child_process_1 = require("node:child_process");
const node_util_1 = __importDefault(require("node:util"));
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
        const totalFiles = files.length;
        const totalFilesSize = files.map(file => file.size).reduce((accumulator, current) => accumulator + current, 0);
        const importCreated = await prisma_client_1.default.blockingDeviceImport.create({
            data: {
                totalFiles,
                totalFilesSize,
                truncate: truncate === 'true',
            }
        });
        const pgClient = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
        });
        await pgClient.connect();
        const { from: copyFrom } = require('pg-copy-streams');
        const fs = require('node:fs');
        const execPromise = node_util_1.default.promisify(node_child_process_1.exec);
        if (truncate === 'true') {
            await pgClient.query(`TRUNCATE "BlockingDevice"`);
            await pgClient.query(`TRUNCATE "ActivationReport"`);
        }
        const startTime = new Date();
        console.log(`[!] Start time: ${startTime}`);
        for (const [index, file] of files.entries()) {
            let customerEmail = '';
            try {
                const { stdout, stderr } = await execPromise(`head -2 ${file.path} | tail -1 | cut -d',' -f1 | xargs echo -n`);
                customerEmail = stdout;
            }
            catch (error) {
                console.log(error);
            }
            try {
                const { stdout, stderr } = await execPromise(`tail -n +5 ${file.path} | head -n -1 > ${file.path}_prepared`);
            }
            catch (error) {
                console.log(error);
            }
            const sourceStream = fs.createReadStream(`${file.path}_prepared`);
            try {
                console.log(`[!] Customer ${index + 1}: ` + customerEmail);
                await pgClient.query(`SET datestyle = dmy`);
                await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" SET DEFAULT '${customerEmail}'`);
                const sqlCopy = `COPY "BlockingDevice" ("customerId","deviceId","imei","serial","locked","lockType","status","isActivated","previousStatus","previousStatusChangedOn","make","model","type","deleted","activatedDeviceDeleted","registeredOn","enrolledOn","unregisteredOn","deletedOn","activationDate","billable","lastConnectedAt","nextLockDate","appVersion") FROM STDIN WITH (FORMAT CSV, NULL 'NA')`;
                const ingestStream = pgClient.query(copyFrom(sqlCopy));
                await (0, promises_1.pipeline)(sourceStream, ingestStream);
                console.log(`[+] Elapsed time: ${this.getTimeElapsedFromDate(startTime)} seconds`);
            }
            finally {
                try {
                    fs.unlinkSync(file.path);
                    fs.unlinkSync(`${file.path}_prepared`);
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        const elapsedTime = this.getTimeElapsedFromDate(startTime);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime - minutes * 60;
        console.log(`[!] Execution time: ${minutes} min ${seconds} sec`);
        const importUpdated = await prisma_client_1.default.blockingDeviceImport.update({
            where: { id: importCreated.id },
            data: {
                startedAt: startTime,
                finishedAt: new Date(),
            }
        });
        const { id } = importUpdated;
        return { id };
        await pgClient.query(`ALTER TABLE "BlockingDevice" ALTER COLUMN "customerEmail" DROP DEFAULT`);
        // const elapsedTime = this.getTimeElapsedFromDate(startTime)
        // const minutes = Math.floor(elapsedTime / 60)
        // const seconds = elapsedTime - minutes * 60
        console.log(`[!] Execution time: ${minutes} min ${seconds} sec`);
        console.log('pgClient.end()');
        await pgClient.end();
    }
    async createActivationReport() {
        const deviceType = 'Android Device';
        const activationReportData = [];
        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 7 * 1000));
        const lastFortnightDate = new Date(currentDate.getTime() - (60 * 60 * 24 * 15 * 1000));
        console.log(`[!] Device type : ` + deviceType);
        const customers = await prisma_client_1.default.customer.findMany();
        const totalCustomers = customers.length;
        for (const [index, { name, email }] of customers.entries()) {
            console.log(`[!] Customer ${index + 1}/${totalCustomers}: ` + email);
            const billableQuery = prisma_client_1.default.blockingDevice.count({
                where: {
                    customerEmail: email,
                    type: deviceType,
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
                    type: deviceType,
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
                deviceType,
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
        const deviceType = 'Android Device';
        const activationReportQuery = prisma_client_1.default.activationReport.groupBy({
            where: {
                deviceType
            },
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
            where: {
                deviceType
            },
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
        const heading = [['Cliente', 'Facturables', 'No Facturables', 'APS', 'APQ']];
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(workSheet, heading);
        XLSX.utils.sheet_add_json(workSheet, data, { origin: 'A2', skipHeader: true });
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1');
        const buffer = XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' });
        return buffer;
    }
    async getCustomerReport(name) {
        const { to: copyTo } = require('pg-copy-streams');
        const pgClient = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
        });
        await pgClient.connect();
        const fs = require('node:fs');
        const crypto = require('node:crypto');
        const path = require('node:path');
        const customer = await prisma_client_1.default.customer.findFirst({
            where: {
                name
            }
        });
        await pgClient.query(`TRUNCATE "BlockingDeviceReport"`);
        const queryBillable = `
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
        'Facturable'
      FROM "BlockingDevice"
      WHERE "customerEmail" = '${customer === null || customer === void 0 ? void 0 : customer.email}'
        AND (
          billable = 'True'
          OR (
            status = 'Enrolled'
            AND billable = 'False'
          )
        )`;
        await pgClient.query(queryBillable);
        const queryNonBillable = `INSERT INTO "BlockingDeviceReport"("deviceId","imei","serial","locked","lockType","status","previousStatus","previousStatusChangedOn","make","model","type","deleted","activatedDeviceDeleted","registeredOn","enrolledOn","unregisteredOn","deletedOn","activationDate","billable","billableText") SELECT "deviceId","imei","serial","locked","lockType","status","previousStatus","previousStatusChangedOn","make","model","type","deleted","activatedDeviceDeleted","registeredOn","enrolledOn","unregisteredOn","deletedOn","activationDate","billable",'Sin costo' FROM "BlockingDevice" WHERE "customerEmail" = '${customer === null || customer === void 0 ? void 0 : customer.email}' AND (billable IS NULL OR (NOT (billable = 'True' OR (status = 'Enrolled' AND billable = 'False'))))`;
        await pgClient.query(queryNonBillable);
        const filePath = path.resolve(`./tmp/report-${crypto.randomBytes(4).readUInt32LE(0)}`);
        const sqlCopy = `COPY (SELECT "deviceId" AS "device_id","imei","serial" AS "serial_no","locked","lockType" AS "lock_type","status" AS "estado","previousStatus" AS "previous_status","previousStatusChangedOn" AS "previous_status_changed_on","make","model","type" AS "tipo","deleted","activatedDeviceDeleted" AS "activated_device_deleted","registeredOn" AS "registered_on","enrolledOn" AS "enrolled_on","unregisteredOn" AS "unregistered_on","deletedOn" AS "deleted_on","activationDate" AS "activation_date","billable","billableText" AS "facturables" FROM "BlockingDeviceReport" ORDER BY "deviceId") TO STDOUT CSV DELIMITER ';' HEADER NULL 'NA'`;
        const outStream = pgClient.query(copyTo(sqlCopy));
        const writeStream = fs.createWriteStream(filePath);
        await (0, promises_1.pipeline)(outStream, writeStream);
        return filePath;
    }
    async listImports({ perPage = 10, page = 0, q: searchText = '' }) {
        const importsQuery = prisma_client_1.default.blockingDeviceImport.findMany({
            skip: Number(perPage) * Number(page),
            take: Number(perPage),
            orderBy: {
                createdAt: 'desc'
            },
        });
        const [imports, importsCount] = await prisma_client_1.default.$transaction([
            importsQuery,
            prisma_client_1.default.blockingDeviceImport.count(),
        ]);
        return {
            total: importsCount,
            page: Number(page),
            perPage: Number(perPage),
            data: imports
        };
    }
}
exports.default = BlockingRepository;
