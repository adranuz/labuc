import { compare } from 'bcryptjs';
import {
  JsonWebTokenError,
  NotBeforeError,
  sign as signJWT,
  TokenExpiredError,
  verify as verifyJWT,
} from 'jsonwebtoken';
import Option from '../../common/types/Option.type';
import { AUTHENTICATED_USER_TOKEN_TTL, JWT_SECRET_KEY } from '../../../config';
import prismaClient from '../../common/persistence/prisma-client';
import IAuthRepository from '../service/IAuthRepository';
import { AuthenticatedUserDTO, PublicUserDTO } from '../../user/dto/user.dto';

export default class AuthRepository implements IAuthRepository {
  async authenticateUser(email: string, password: string): Promise<Option<PublicUserDTO>> {
    const foundUser = await prismaClient.user.findUnique({
      where: { email },
      include: {
        roles: {
          select: {
            name: true,
            permissions: {
              select: {
                action: true
              }
            }
          }
        }
      }
    });

    if (!foundUser) return;

    const { id, name, roles } = foundUser;

    const isMatchedPassword = await compare(password, foundUser.password);

    if (!isMatchedPassword) return;

    return {
      id,
      name,
      email,
      roles: roles,
    };
  }

  async getAuthenticatedUserByToken(token: string): Promise<Option<AuthenticatedUserDTO>> {
    try {
      const decodedData = verifyJWT(token, JWT_SECRET_KEY);
      const { id, name, email, roles } = decodedData as PublicUserDTO;

      if (!id || !email) {
        return;
      }

      return {
        id,
        email,
        token,
        name,
        roles,
      };
    } catch (err) {
      if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
        return;
      }

      throw err;
    }
  }

  async generateToken(user: PublicUserDTO): Promise<string> {
    return signJWT(user, JWT_SECRET_KEY, { expiresIn: AUTHENTICATED_USER_TOKEN_TTL });
  }
}
