"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockingController {
    constructor(blockingService) {
        this.blockingService = blockingService;
        this.createBlockingReport = async (req, res) => {
            const files = req.files;
            const { reportedAt } = req.body;
            try {
                const importedBlocking = await this.blockingService.createBlockingReport({ files, reportedAt });
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
        this.createBlockingDeviceConsolidatedReport = async (req, res) => {
            try {
                const { id } = req.params;
                const blockingDeviceConsolidatedReportCreated = await this.blockingService.createBlockingDeviceConsolidatedReport(id);
                res.status(200).json(blockingDeviceConsolidatedReportCreated);
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
        this.getBlockingDeviceConsolidatedReport = async (req, res) => {
            try {
                const { id } = req.params;
                const { deviceType } = req.query;
                const blockingDeviceConsolidatedReport = await this.blockingService.getBlockingDeviceConsolidatedReport(id, deviceType);
                res.status(200).json(blockingDeviceConsolidatedReport);
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
        this.getBlockingDeviceConsolidatedReportFile = async (req, res) => {
            try {
                const { id } = req.params;
                const { deviceType } = req.query;
                const { buffer, fileName } = await this.blockingService.getBlockingDeviceConsolidatedReportFile(id, deviceType);
                res.attachment(fileName);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.write(buffer);
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
        this.getCustomerReportFile = async (req, res) => {
            try {
                const { id, name } = req.params;
                const { deviceType } = req.query;
                const { filePath, fileName } = await this.blockingService.getCustomerReportFile(id, name, deviceType);
                const fs = require('node:fs');
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    fs.unlink(filePath, () => {
                        console.log(`File ${filePath} was deleted`);
                    });
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
        this.listBlockingReport = async (req, res) => {
            try {
                const imports = await this.blockingService.listBlockingReport(req.query);
                res.status(200).json(imports);
            }
            catch (err) {
                console.log('Unable to get list blocking report:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get list blocking report',
                    },
                });
            }
        };
        this.getBlockingDevice = async (req, res) => {
            try {
                const { id } = req.params;
                const imports = await this.blockingService.getBlockingDevice(id);
                res.status(200).json(imports);
            }
            catch (err) {
                console.log('Unable to getBlockingDevice:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to getBlockingDevice',
                    },
                });
            }
        };
        this.getBlockingDeviceImportLog = async (req, res) => {
            try {
                const { id } = req.params;
                const { type } = req.query;
                const imports = await this.blockingService.getBlockingDeviceImportLog(id, type);
                res.status(200).json(imports);
            }
            catch (err) {
                console.log('Unable to get getBlockingDeviceImportLog:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to getBlockingDeviceImportLog',
                    },
                });
            }
        };
    }
}
exports.default = BlockingController;
