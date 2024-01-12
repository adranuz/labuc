import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';


export default (cradle: ICradle) => {
  const router = Router();
  const { sendConsumptionHubData } = cradle.consumptionController;
  const { verifySignature } = cradle.authMiddleware;

  router.post('/consumption/hub', verifySignature, sendConsumptionHubData);

  return router;
};