"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PacController {
    constructor(pacService) {
        this.pacService = pacService;
        this.getPacCustomerCreditStats = async (req, res) => {
            try {
                const { id } = req.params;
                const data = await this.pacService.getPacCustomerCreditStats({ id });
                res.status(200).json(data);
            }
            catch (err) {
                console.log('Unable to get pac customer credit stats:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get pac customer credit stats',
                    },
                });
            }
        };
        this.getPacCustomerCreditReport = async (req, res) => {
            try {
                const { id } = req.params;
                const { status, startDate, endDate, page, perPage, pagination, q } = req.query;
                const data = await this.pacService.getPacCustomerCreditReport({ id, status, startDate, endDate, page, perPage, pagination, q });
                res.status(200).json(data);
            }
            catch (err) {
                console.log('Unable to get pac customer credit report:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get pac customer credit report',
                    },
                });
            }
        };
        this.getPacCustomerCreditReportFile = async (req, res) => {
            try {
                const { id } = req.params;
                const { status, startDate, endDate } = req.query;
                const { buffer, fileName } = await this.pacService.getPacCustomerCreditReportFile({ id, status, startDate, endDate });
                res.attachment(fileName);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.write(buffer);
                res.end();
            }
            catch (err) {
                console.log('Unable to get pac customer credit report file:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get pac customer credit report file',
                    },
                });
            }
        };
        this.getPacCustomerScoreReport = async (req, res) => {
            try {
                const { id } = req.params;
                const { status, startDate, endDate, page, perPage, pagination, q } = req.query;
                const data = await this.pacService.getPacCustomerScoreReport({ id, status, startDate, endDate, page, perPage, pagination, q });
                res.status(200).json(data);
            }
            catch (err) {
                console.log('Unable to get pac customer score report:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get pac customer score report',
                    },
                });
            }
        };
        this.getPacCustomerScoreReportFile = async (req, res) => {
            try {
                const { id } = req.params;
                const { status, startDate, endDate } = req.query;
                const { buffer, fileName } = await this.pacService.getPacCustomerScoreReportFile({ id, status, startDate, endDate });
                res.attachment(fileName);
                res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
                res.write(buffer);
                res.end();
            }
            catch (err) {
                console.log('Unable to get pac customer score report file:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get pac customer score report file',
                    },
                });
            }
        };
    }
}
exports.default = PacController;
