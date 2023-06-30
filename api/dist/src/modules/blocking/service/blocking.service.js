"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockingService {
    constructor(blockingRepository) {
        this.blockingRepository = blockingRepository;
    }
    importBlocking(data) {
        return this.blockingRepository.importBlocking(data);
    }
    reportBlocking() {
        return this.blockingRepository.reportBlocking();
    }
    getActivationReport() {
        return this.blockingRepository.getActivationReport();
    }
    getActivationReportFile() {
        return this.blockingRepository.getActivationReportFile();
    }
    getCustomerReport(name) {
        return this.blockingRepository.getCustomerReport(name);
    }
}
exports.default = BlockingService;
