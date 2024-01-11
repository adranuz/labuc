import { createContainer, InjectionMode } from 'awilix';

import ICradle from './icradle.interface';
import authProvider from './providers/auth.provider';
import userProvider from './providers/user.provider';
import customerProvider from './providers/customer.provider';
import blockingProvider from './providers/blocking.provider';
import commonProvider from './providers/common.provider';
import pacProvider from './providers/pac.provider';
import consumptionProvider from './providers/consumption.provider';

const container = createContainer<ICradle>({
  injectionMode: InjectionMode.CLASSIC,
});

authProvider(container);
userProvider(container);
customerProvider(container);
blockingProvider(container);
commonProvider(container);
pacProvider(container);
consumptionProvider(container);

export default container;
