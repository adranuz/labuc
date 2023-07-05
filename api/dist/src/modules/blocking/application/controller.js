"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockingController {
    constructor(blockingService) {
        this.blockingService = blockingService;
        this.importBlocking = async (req, res) => {
            const files = req.files;
            const { truncate } = req.body;
            try {
                const importedBlocking = await this.blockingService.importBlocking({ files, truncate });
                res.status(201).json(importedBlocking);
            }
            catch (err) {
                console.log('Unable to import blocking:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to import blocking',
                    },
                });
            }
        };
        this.createActivationReport = async (req, res) => {
            try {
                const activationReportCreated = await this.blockingService.createActivationReport();
                res.status(200).json(activationReportCreated);
            }
            catch (err) {
                console.log('Unable to create activation report:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to create activation report',
                    },
                });
            }
        };
        this.getActivationReport = async (req, res) => {
            try {
                const activationReport = await this.blockingService.getActivationReport();
                res.status(200).json(activationReport);
            }
            catch (err) {
                console.log('Unable to get activation report:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get activation report',
                    },
                });
            }
        };
        this.getActivationReportFile = async (req, res) => {
            try {
                const reportBuffer = await this.blockingService.getActivationReportFile();
                const currentDate = new Date().toISOString().split('T')[0];
                res.attachment(`Consolidado - ${currentDate}.xlsx`);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.write(reportBuffer);
                res.end();
            }
            catch (err) {
                console.log('Unable to get activation report file:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get activation report file',
                    },
                });
            }
        };
        this.getCustomerReport = async (req, res) => {
            try {
                const fs = require('node:fs');
                const { name } = req.query;
                const filePath = await this.blockingService.getCustomerReport(name);
                const currentDate = new Date().toISOString().split('T')[0];
                const fileName = `Reporte ${name} - ${currentDate}.csv`;
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    fs.unlink(filePath, () => {
                        console.log(`File ${filePath} was deleted`);
                    });
                    // fs.unlinkSync(yourFilePath) // If you don't need callback
                });
            }
            catch (err) {
                console.log('Unable to get client report:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get client report',
                    },
                });
            }
        };
        this.listImports = async (req, res) => {
            try {
                const imports = await this.blockingService.listImports(req.query);
                res.status(200).json(imports);
            }
            catch (err) {
                console.log('Unable to get imports:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get imports',
                    },
                });
            }
        };
    }
}
exports.default = BlockingController;
