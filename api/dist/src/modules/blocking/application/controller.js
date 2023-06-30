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
        this.reportBlocking = async (req, res) => {
            try {
                const reportBlocking = await this.blockingService.reportBlocking();
                res.status(200).json(reportBlocking);
            }
            catch (err) {
                console.log('Unable to report blocking:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to report blocking',
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
                const { name } = req.query;
                const reportBuffer = await this.blockingService.getCustomerReport(name);
                const currentDate = new Date().toISOString().split('T')[0];
                res.attachment(`Reporte ${name} - ${currentDate}.xlsx`);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.write(reportBuffer);
                res.end();
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
    }
}
exports.default = BlockingController;
