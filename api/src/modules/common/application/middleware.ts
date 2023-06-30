import { NextFunction, Request, Response } from 'express';

export default class CommonMiddleware {
  constructor() {}

  errorHandler = async (err: any, _: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('errorHandler')
    console.error(err);
    console.error(err?.meta);
    console.error(err?.meta?.cause);
    res.status(500).send('Something broke!');
  };
}
