import { asClass, AwilixContainer } from 'awilix';
import CommonMiddleware from '../../modules/common/application/middleware';

import ICradle from '../icradle.interface';

export interface ICommonProvider {
  commonMiddleware: CommonMiddleware;
}

const commonProvider = (container: AwilixContainer<ICradle>): void => {
  container.register({
    commonMiddleware: asClass(CommonMiddleware),
  });
};

export default commonProvider;
