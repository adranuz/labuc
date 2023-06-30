"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
        this.validate = (schema) => (req, res, next) => {
            try {
                schema.parse({
                    params: req.params,
                    query: req.query,
                    body: req.body,
                });
                next();
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
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
        this.authenticate = async (req, res, next) => {
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
            }
            catch (err) {
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
}
exports.default = AuthMiddleware;
