"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class CustomerMiddleware {
    constructor() {
        this.validate = (schema) => (req, res, next) => {
            try {
                schema.parse({
                    params: req.params,
                    query: req.query,
                    body: req.body,
                    files: req.files,
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
    }
}
exports.default = CustomerMiddleware;
