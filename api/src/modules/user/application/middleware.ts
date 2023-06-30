import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import UserService from '../service/user.service';

export default class UserMiddleware {
  constructor(private userService: UserService) {}
  
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

  requireEmailDoesNotExist = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    const { email } = req.body;
    const foundUser = await this.userService.getUserByEmail(email);

    if (foundUser) {
      return res.status(409).json({
        error: {
          code: 409,
          message: 'Bad Request',
          details: 'The email is already taken',
        },
      });
    }

    next();
  };
}
