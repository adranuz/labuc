import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';


export default (cradle: ICradle) => {
  const router = Router();
  const { sendConsumptionHubData } = cradle.consumptionController;

  router.post('/consumption/hub', sendConsumptionHubData);

  return router;
};