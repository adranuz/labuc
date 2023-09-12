"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PacService {
    constructor(pacRepository) {
        this.pacRepository = pacRepository;
    }
    getPacCustomerCreditStats(data) {
        return this.pacRepository.getPacCustomerCreditStats(data);
    }
    getPacCustomerCreditReport(data) {
        return this.pacRepository.getPacCustomerCreditReport(data);
    }
    getPacCustomerCreditReportFile(data) {
        return this.pacRepository.getPacCustomerCreditReportFile(data);
    }
    getPacCustomerScoreReport(data) {
        return this.pacRepository.getPacCustomerScoreReport(data);
    }
    getPacCustomerScoreReportFile(data) {
        return this.pacRepository.getPacCustomerScoreReportFile(data);
    }
}
exports.default = PacService;
