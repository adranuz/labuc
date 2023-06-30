import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import { importBlockingSchema, getCustomerReportSchema } from './blocking.schema';

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/blocking/import', upload.array('files'), cradle.blockingMiddleware.validate(importBlockingSchema), cradle.blockingController.importBlocking);
  router.get('/blocking/report', cradle.blockingController.reportBlocking);
  router.get('/blocking/report/activation', cradle.blockingController.getActivationReport);
  router.get('/blocking/report/activation/download', cradle.blockingController.getActivationReportFile);
  router.get('/blocking/report/customers', cradle.blockingMiddleware.validate(getCustomerReportSchema), cradle.blockingController.getCustomerReport);

  return router;
};
