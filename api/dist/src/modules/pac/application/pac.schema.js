"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPacCustomerScoreReportFileSchema = exports.getPacCustomerScoreReportSchema = exports.getPacCustomerCreditReportFileSchema = exports.getPacCustomerCreditReportSchema = exports.getPacCustomerCreditStatsSchema = void 0;
const zod_1 = require("zod");
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)().uuid()
    }),
};
const pagination = (0, zod_1.object)({
    perPage: zod_1.coerce.number().positive(),
    page: zod_1.coerce.number().nonnegative(),
    q: (0, zod_1.string)(),
    pagination: (0, zod_1.enum)(['true', 'false']).transform((value) => value === 'true')
});
exports.getPacCustomerCreditStatsSchema = (0, zod_1.object)({
    ...params
});
var creditStatus;
(function (creditStatus) {
    // SOLIC = "SOLIC",
    creditStatus["PEND"] = "PEND";
    creditStatus["CANC"] = "CANC";
    creditStatus["MORA"] = "MORA";
    // REFIN = "REFIN",
    // HOLD = "HOLD",
    creditStatus["ANUL"] = "ANUL";
    // HDAL = "HDAL",
    // DEFI = "DEFI"
})(creditStatus || (creditStatus = {}));
var scoreStatus;
(function (scoreStatus) {
    scoreStatus["accepted"] = "accepted";
    scoreStatus["notAccepted"] = "notAccepted";
})(scoreStatus || (scoreStatus = {}));
exports.getPacCustomerCreditReportSchema = (0, zod_1.object)({
    ...params,
    query: pagination.merge((0, zod_1.object)({
        status: (0, zod_1.nativeEnum)(creditStatus),
        startDate: (0, zod_1.string)(),
        endDate: (0, zod_1.string)()
    })).partial().refine(data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true, 'The start date and end date are required.')
});
exports.getPacCustomerCreditReportFileSchema = (0, zod_1.object)({
    ...params,
    query: (0, zod_1.object)({
        status: (0, zod_1.nativeEnum)(creditStatus),
        startDate: (0, zod_1.string)(),
        endDate: (0, zod_1.string)()
    }).partial().refine(data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true, 'The start date and end date are required.')
});
exports.getPacCustomerScoreReportSchema = (0, zod_1.object)({
    ...params,
    query: pagination.merge((0, zod_1.object)({
        status: (0, zod_1.nativeEnum)(scoreStatus),
        startDate: (0, zod_1.string)(),
        endDate: (0, zod_1.string)()
    })).partial().refine(data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true, 'The start date and end date are required.')
});
exports.getPacCustomerScoreReportFileSchema = (0, zod_1.object)({
    ...params,
    query: (0, zod_1.object)({
        status: (0, zod_1.nativeEnum)(scoreStatus),
        startDate: (0, zod_1.string)(),
        endDate: (0, zod_1.string)()
    }).partial().refine(data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true, 'The start date and end date are required.')
});
