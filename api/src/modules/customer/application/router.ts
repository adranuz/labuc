import { Router } from 'express';
import ICradle from '../../../IoC/icradle.interface';
import {
  // createCustomerSchema,
  updateCustomerSchema, deleteCustomerSchema, getCustomerSchema, paginationFilterSchema } from './customer.schema';

export default (cradle: ICradle) => {
  const router = Router();

  router.get('/customers', cradle.customerMiddleware.validate(paginationFilterSchema), cradle.customerController.listCustomers);
  // router.post('/customers', cradle.customerMiddleware.validate(createCustomerSchema), cradle.customerMiddleware.requireEmailDoesNotExist, cradle.customerController.createCustomer);
  router.get('/customers/:id', cradle.customerMiddleware.validate(getCustomerSchema), cradle.customerController.getCustomer);
  router.put('/customers/:id', cradle.customerMiddleware.validate(updateCustomerSchema), cradle.customerController.updateCustomer);
  router.delete('/customers/:id', cradle.customerMiddleware.validate(deleteCustomerSchema), cradle.customerController.deleteCustomer);

  router.get('/products', cradle.customerMiddleware.validate(paginationFilterSchema), cradle.customerController.listProducts);

  return router;
};
