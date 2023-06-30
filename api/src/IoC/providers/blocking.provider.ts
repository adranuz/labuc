import { asClass, AwilixContainer } from 'awilix';
import BlockingController from '../../modules/blocking/application/controller';
import BlockingMiddleware from '../../modules/blocking/application/middleware';
import BlockingRepository from '../../modules/blocking/persistence/blocking.repository';
import BlockingService from '../../modules/blocking/service/blocking.service';

import ICradle from '../icradle.interface';

export interface IBlockingProvider {
  blockingRepository: BlockingRepository;
  blockingService: BlockingService;
  blockingController: BlockingController;
  blockingMiddleware: BlockingMiddleware;
}

const blockingProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    blockingRepository: asClass(BlockingRepository),
    blockingService: asClass(BlockingService),
    blockingController: asClass(BlockingController),
    blockingMiddleware: asClass(BlockingMiddleware),
  });
};

export default blockingProvider;
