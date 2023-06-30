import { IAuthProvider } from './providers/auth.provider';
import { IUserProvider } from './providers/user.provider';
import { ICustomerProvider } from './providers/customer.provider';
import { IBlockingProvider } from './providers/blocking.provider';
import { ICommonProvider } from './providers/common.provider';

export default interface ICradle extends IAuthProvider, IUserProvider, ICustomerProvider, IBlockingProvider, ICommonProvider {}
