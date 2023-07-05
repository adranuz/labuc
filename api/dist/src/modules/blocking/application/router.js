"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blocking_schema_1 = require("./blocking.schema");
const multer = require('multer');
const upload = multer({ dest: './tmp/' });
exports.default = (cradle) => {
    const router = (0, express_1.Router)();
    router.post('/blocking/import', upload.array('files'), cradle.blockingMiddleware.validate(blocking_schema_1.importBlockingSchema), cradle.blockingController.importBlocking);
    router.post('/blocking/report/activation', cradle.blockingController.createActivationReport);
    router.get('/blocking/report/activation', cradle.blockingController.getActivationReport);
    router.get('/blocking/report/activation/download', cradle.blockingController.getActivationReportFile);
    router.get('/blocking/report/customers', cradle.blockingMiddleware.validate(blocking_schema_1.getCustomerReportSchema), cradle.blockingController.getCustomerReport);
    router.get('/blocking/imports', cradle.blockingMiddleware.validate(blocking_schema_1.paginationFilterSchema), cradle.blockingController.listImports);
    return router;
};
