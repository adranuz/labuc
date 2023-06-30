import { asClass, AwilixContainer } from 'awilix';
import CustomerController from '../../modules/customer/application/controller';
import CustomerMiddleware from '../../modules/customer/application/middleware';
import CustomerRepository from '../../modules/customer/persistence/customer.repository';
import CustomerService from '../../modules/customer/service/customer.service';

import ICradle from '../icradle.interface';

export interface ICustomerProvider {
  customerRepository: CustomerRepository;
  customerService: CustomerService;
  customerController: CustomerController;
  customerMiddleware: CustomerMiddleware;
}

const customerProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    customerRepository: asClass(CustomerRepository),
    customerService: asClass(CustomerService),
    customerController: asClass(CustomerController),
    customerMiddleware: asClass(CustomerMiddleware),
  });
};

export default customerProvider;
