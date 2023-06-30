import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AuthService from '../service/auth.service';

export default class AuthMiddleware {
  constructor(private authService: AuthService) {}

  validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {

        return res.status(400).json({
          error: {
            code: 400,
            message: 'Bad Request',
            details: err.errors,
          },
        });
      }
      next(err);
    }
  };

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
      return res.status(401).json({
        error: {
          code: 401,
          message: 'Unauthorized',
          details: 'This operation requires login',
        },
      });
    }

    const jwt = authorizationHeader.replace('Bearer ', '');

    try {
      const authenticatedUser = await this.authService.authenticateUserByToken(jwt);

      if (!authenticatedUser) {
        return res.status(401).json({
          error: {
            code: 401,
            message: 'Unauthorized',
            details: 'This operation requires login',
          },
        });
      }

      req.requester = authenticatedUser;

      next();
    } catch (err) {
      return res.status(500).json({
        error: {
          code: 500,
          message: 'Internal Server Error',
          details: 'Unable to authenticate user',
        },
      });
    }
  };
}
