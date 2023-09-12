"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blocking_schema_1 = require("./blocking.schema");
const multer = require('multer');
const upload = multer({ dest: './tmp/' });
exports.default = (cradle) => {
    const router = (0, express_1.Router)();
    router.post('/blocking/reports', upload.array('files'), cradle.blockingMiddleware.validate(blocking_schema_1.createBlockingReportSchema), cradle.blockingController.createBlockingReport);
    router.get('/blocking/reports', cradle.blockingMiddleware.validate(blocking_schema_1.listBlockingReportSchema), cradle.blockingController.listBlockingReport);
    router.get('/blocking/reports/:id', cradle.blockingMiddleware.validate(blocking_schema_1.getBlockingDeviceSchema), cradle.blockingController.getBlockingDevice);
    router.get('/blocking/reports/:id/log', cradle.blockingMiddleware.validate(blocking_schema_1.getBlockingDeviceImportLogSchema), cradle.blockingController.getBlockingDeviceImportLog);
    router.post('/blocking/reports/:id/consolidated', cradle.blockingController.createBlockingDeviceConsolidatedReport);
    router.get('/blocking/reports/:id/consolidated', cradle.blockingMiddleware.validate(blocking_schema_1.getBlockingDeviceConsolidatedReportSchema), cradle.blockingController.getBlockingDeviceConsolidatedReport);
    router.get('/blocking/reports/:id/consolidated/download', cradle.blockingMiddleware.validate(blocking_schema_1.getBlockingDeviceConsolidatedReportSchema), cradle.blockingController.getBlockingDeviceConsolidatedReportFile);
    router.get('/blocking/reports/:id/customers/:name/download', cradle.blockingMiddleware.validate(blocking_schema_1.getCustomerReportSchema), cradle.blockingController.getCustomerReportFile);
    return router;
};
