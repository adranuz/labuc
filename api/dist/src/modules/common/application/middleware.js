"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonMiddleware {
    constructor() {
        this.errorHandler = async (err, _, res, next) => {
            var _a;
            console.log('errorHandler');
            console.error(err);
            console.error(err === null || err === void 0 ? void 0 : err.meta);
            console.error((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.cause);
            res.status(500).send('Something broke!');
        };
    }
}
exports.default = CommonMiddleware;
