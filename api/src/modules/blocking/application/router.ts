import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import { createBlockingReportSchema, getNuovoReportConsolidatedSchema, getCustomerReportSchema, getNuovoReportSchema, getNuovoReportLogSchema, listBlockingReportSchema } from './blocking.schema';

const multer = require('multer')
const upload = multer({ dest: './tmp/' })

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/blocking/reports', upload.array('files'), cradle.blockingMiddleware.validate(createBlockingReportSchema), cradle.blockingController.createBlockingReport);
  router.get('/blocking/reports', cradle.blockingMiddleware.validate(listBlockingReportSchema), cradle.blockingController.listBlockingReport);

  router.get('/blocking/reports/:id', cradle.blockingMiddleware.validate(getNuovoReportSchema), cradle.blockingController.getNuovoReport);
  router.get('/blocking/reports/:id/log', cradle.blockingMiddleware.validate(getNuovoReportLogSchema), cradle.blockingController.getNuovoReportLog);

  router.post('/blocking/reports/:id/consolidated', cradle.blockingController.createNuovoReportConsolidated);
  router.get('/blocking/reports/:id/consolidated', cradle.blockingMiddleware.validate(getNuovoReportConsolidatedSchema), cradle.blockingController.getNuovoReportConsolidated);

  router.get('/blocking/reports/:id/consolidated/download', cradle.blockingMiddleware.validate(getNuovoReportConsolidatedSchema), cradle.blockingController.getNuovoReportConsolidatedFile);

  router.get('/blocking/reports/:id/customers/:name/download', cradle.blockingMiddleware.validate(getCustomerReportSchema), cradle.blockingController.getCustomerReportFile);

  return router;
};
