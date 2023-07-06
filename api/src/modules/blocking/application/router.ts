import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import { importBlockingSchema, getActivationReportSchema, getCustomerReportSchema, paginationFilterSchema } from './blocking.schema';

const multer  = require('multer')
const upload = multer({ dest: './tmp/' })

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/blocking/import', upload.array('files'), cradle.blockingMiddleware.validate(importBlockingSchema), cradle.blockingController.importBlocking);
  router.post('/blocking/report/activation', cradle.blockingController.createActivationReport);
  router.get('/blocking/report/activation', cradle.blockingMiddleware.validate(getActivationReportSchema), cradle.blockingController.getActivationReport);
  router.get('/blocking/report/activation/download', cradle.blockingMiddleware.validate(getActivationReportSchema), cradle.blockingController.getActivationReportFile);
  router.get('/blocking/report/customer/download', cradle.blockingMiddleware.validate(getCustomerReportSchema), cradle.blockingController.getCustomerReportFile);

  router.get('/blocking/imports', cradle.blockingMiddleware.validate(paginationFilterSchema), cradle.blockingController.listImports);

  return router;
};
