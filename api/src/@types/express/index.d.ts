import { AuthenticatedUserDTO } from '../modules/user/dto/user.dto';

declare module 'express' {
  interface Request {
    requester?: AuthenticatedUserDTO;
  }
}
