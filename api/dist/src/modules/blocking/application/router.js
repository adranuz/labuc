"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blocking_schema_1 = require("./blocking.schema");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.default = (cradle) => {
    const router = (0, express_1.Router)();
    router.post('/blocking/import', upload.array('files'), cradle.blockingMiddleware.validate(blocking_schema_1.importBlockingSchema), cradle.blockingController.importBlocking);
    router.get('/blocking/report', cradle.blockingController.reportBlocking);
    router.get('/blocking/report/activation', cradle.blockingController.getActivationReport);
    router.get('/blocking/report/activation/download', cradle.blockingController.getActivationReportFile);
    router.get('/blocking/report/customers', cradle.blockingMiddleware.validate(blocking_schema_1.getCustomerReportSchema), cradle.blockingController.getCustomerReport);
    return router;
};
