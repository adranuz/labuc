import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import { createBlockingReportSchema, getBlockingDeviceConsolidatedReportSchema, getCustomerReportSchema, getBlockingDeviceSchema, getBlockingDeviceImportLogSchema, listBlockingReportSchema } from './blocking.schema';

const multer = require('multer')
const upload = multer({ dest: './tmp/' })

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/blocking/reports', upload.array('files'), cradle.blockingMiddleware.validate(createBlockingReportSchema), cradle.blockingController.createBlockingReport);
  router.get('/blocking/reports', cradle.blockingMiddleware.validate(listBlockingReportSchema), cradle.blockingController.listBlockingReport);

  router.get('/blocking/reports/:id', cradle.blockingMiddleware.validate(getBlockingDeviceSchema), cradle.blockingController.getBlockingDevice);
  router.get('/blocking/reports/:id/log', cradle.blockingMiddleware.validate(getBlockingDeviceImportLogSchema), cradle.blockingController.getBlockingDeviceImportLog);

  router.post('/blocking/reports/:id/consolidated', cradle.blockingController.createBlockingDeviceConsolidatedReport);
  router.get('/blocking/reports/:id/consolidated', cradle.blockingMiddleware.validate(getBlockingDeviceConsolidatedReportSchema), cradle.blockingController.getBlockingDeviceConsolidatedReport);

  router.get('/blocking/reports/:id/consolidated/download', cradle.blockingMiddleware.validate(getBlockingDeviceConsolidatedReportSchema), cradle.blockingController.getBlockingDeviceConsolidatedReportFile);

  router.get('/blocking/reports/:id/customers/:name/download', cradle.blockingMiddleware.validate(getCustomerReportSchema), cradle.blockingController.getCustomerReportFile);

  return router;
};
