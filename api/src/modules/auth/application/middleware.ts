import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AuthService from '../service/auth.service';
import crypto from "crypto"
import { SECRET_TOKEN, JWT_SECRET_KEY } from '../../../config';


const verify_signature = (req: Request) => {
  try {
    const signature = crypto
    .createHash("sha256")
    .update(SECRET_TOKEN, "utf-8")
    .digest("hex");

    const xHubSignature = req.header("x-hub-signature") ?? '';
    let trusted = Buffer.from(`${signature}`);
    let untrusted =  Buffer.from(xHubSignature);
    let result = crypto.timingSafeEqual(trusted, untrusted)
    return result
  } catch (error) {
    return false
  }
}
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

  verifySignature = (req: Request, res: Response, next: NextFunction) => {
		if (verify_signature(req)) {
      next()
		} else {
			res.status(400).json({
				error: {
					code: 401,
					message: "Unauthorized",
					details: "You are unauthorized to access this resource",
				},
			});
		}
	}
}
