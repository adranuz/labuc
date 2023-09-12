"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class PacMiddleware {
    constructor() {
        this.validate = (schema) => (req, res, next) => {
            try {
                const { params, query, body, files } = schema.parse({
                    params: req.params,
                    query: req.query,
                    body: req.body,
                    files: req.files,
                });
                req.params = params;
                req.query = query;
                req.body = body;
                req.files = files;
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
exports.default = PacMiddleware;
