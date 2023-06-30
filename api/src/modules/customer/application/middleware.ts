import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export default class CustomerMiddleware {
  constructor() {}
  
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
}
