import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import {
  getPacCustomerCreditStatsSchema,
  getPacCustomerCreditReportSchema,
  getPacCustomerScoreReportSchema
} from './pac.schema';

export default (cradle: ICradle) => {
  const router = Router();

  router.get('/pac/customers/:id/stats', cradle.pacMiddleware.validate(getPacCustomerCreditStatsSchema), cradle.pacController.getPacCustomerCreditStats);
  router.get('/pac/customers/:id/credit/report', cradle.pacMiddleware.validate(getPacCustomerCreditReportSchema), cradle.pacController.getPacCustomerCreditReport);
  router.get('/pac/customers/:id/credit/report/download', cradle.pacMiddleware.validate(getPacCustomerCreditReportSchema), cradle.pacController.getPacCustomerCreditReportFile);
  router.get('/pac/customers/:id/score/report', cradle.pacMiddleware.validate(getPacCustomerScoreReportSchema), cradle.pacController.getPacCustomerScoreReport);
  router.get('/pac/customers/:id/score/report/download', cradle.pacMiddleware.validate(getPacCustomerScoreReportSchema), cradle.pacController.getPacCustomerScoreReportFile);

  return router;
};
