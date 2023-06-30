import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import { loginSchema } from './auth.schema';

export default (cradle: ICradle) => {
  const router = Router();

  router.post('/login', cradle.authMiddleware.validate(loginSchema), cradle.authController.login);

  return router;
};
