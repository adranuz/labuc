import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export default class BlockingMiddleware {
  constructor() { }

  validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {

    try {
      const { params, query, body, files } = schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
        files: req.files,
      });

      req.params = params
      req.query = query
      req.body = body
      req.files = files

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
