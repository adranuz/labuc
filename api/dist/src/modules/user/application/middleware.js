"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class UserMiddleware {
    constructor(userService) {
        this.userService = userService;
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
        this.requireEmailDoesNotExist = async (req, res, next) => {
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
}
exports.default = UserMiddleware;
