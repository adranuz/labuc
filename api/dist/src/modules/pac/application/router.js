"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pac_schema_1 = require("./pac.schema");
exports.default = (cradle) => {
    const router = (0, express_1.Router)();
    router.get('/pac/customers/:id/stats', cradle.pacMiddleware.validate(pac_schema_1.getPacCustomerCreditStatsSchema), cradle.pacController.getPacCustomerCreditStats);
    router.get('/pac/customers/:id/credit/report', cradle.pacMiddleware.validate(pac_schema_1.getPacCustomerCreditReportSchema), cradle.pacController.getPacCustomerCreditReport);
    router.get('/pac/customers/:id/credit/report/download', cradle.pacMiddleware.validate(pac_schema_1.getPacCustomerCreditReportSchema), cradle.pacController.getPacCustomerCreditReportFile);
    router.get('/pac/customers/:id/score/report', cradle.pacMiddleware.validate(pac_schema_1.getPacCustomerScoreReportSchema), cradle.pacController.getPacCustomerScoreReport);
    router.get('/pac/customers/:id/score/report/download', cradle.pacMiddleware.validate(pac_schema_1.getPacCustomerScoreReportSchema), cradle.pacController.getPacCustomerScoreReportFile);
    return router;
};
