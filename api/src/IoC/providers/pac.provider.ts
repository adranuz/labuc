import { asClass, AwilixContainer } from 'awilix';
import PacController from '../../modules/pac/application/controller';
import PacMiddleware from '../../modules/pac/application/middleware';
import PacRepository from '../../modules/pac/persistence/pac.repository';
import PacService from '../../modules/pac/service/pac.service';

import ICradle from '../icradle.interface';

export interface IPacProvider {
  pacRepository: PacRepository;
  pacService: PacService;
  pacController: PacController;
  pacMiddleware: PacMiddleware;
}

const pacProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    pacRepository: asClass(PacRepository),
    pacService: asClass(PacService),
    pacController: asClass(PacController),
    pacMiddleware: asClass(PacMiddleware),
  });
};

export default pacProvider;
