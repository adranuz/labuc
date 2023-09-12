import { IAuthProvider } from './providers/auth.provider';
import { IUserProvider } from './providers/user.provider';
import { ICustomerProvider } from './providers/customer.provider';
import { IBlockingProvider } from './providers/blocking.provider';
import { ICommonProvider } from './providers/common.provider';
import { IPacProvider } from './providers/pac.provider';

export default interface ICradle extends
  IAuthProvider,
  IUserProvider,
  ICustomerProvider,
  IBlockingProvider,
  ICommonProvider,
  IPacProvider { }
