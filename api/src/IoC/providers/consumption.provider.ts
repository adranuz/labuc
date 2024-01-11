import { asClass, AwilixContainer } from 'awilix';
// import UserController from '../../modules/user/application/controller';
// import UserMiddleware from '../../modules/user/application/middleware';
// import UserRepository from '../../modules/user/persistence/user.repository';
// import UserService from '../../modules/user/service/user.service';

import ICradle from '../icradle.interface';
import ConsumptionRepository from '../../modules/consumption/persistence/consumption.repository';
import ConsumptionService from '../../modules/consumption/service/consumption.service';
import ConsumptionController from '../../modules/consumption/application/controller';
import ConsumptionMiddleware from '../../modules/consumption/application/middleware';

export interface IConsumptionProvider {
  consumptionRepository: ConsumptionRepository;
  consumptionService: ConsumptionService;
  consumptionController: ConsumptionController;
  consumptionMiddleware: ConsumptionMiddleware;
}

const consumptionProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    consumptionRepository: asClass(ConsumptionRepository),
    consumptionService: asClass(ConsumptionService),
    consumptionController: asClass(ConsumptionController),
    consumptionMiddleware: asClass(ConsumptionMiddleware),
  });
};

export default consumptionProvider;
