import { createContainer, InjectionMode } from 'awilix';

import ICradle from './icradle.interface';
import authProvider from './providers/auth.provider';
import userProvider from './providers/user.provider';
import customerProvider from './providers/customer.provider';
import blockingProvider from './providers/blocking.provider';
import commonProvider from './providers/common.provider';

const container = createContainer<ICradle>({
  injectionMode: InjectionMode.CLASSIC,
});

authProvider(container);
userProvider(container);
customerProvider(container);
blockingProvider(container);
commonProvider(container);

export default container;
