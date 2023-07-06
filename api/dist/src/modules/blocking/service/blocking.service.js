"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockingService {
    constructor(blockingRepository) {
        this.blockingRepository = blockingRepository;
    }
    importBlocking(data) {
        return this.blockingRepository.importBlocking(data);
    }
    createActivationReport() {
        return this.blockingRepository.createActivationReport();
    }
    getActivationReport(deviceType) {
        return this.blockingRepository.getActivationReport(deviceType);
    }
    getActivationReportFile(deviceType) {
        return this.blockingRepository.getActivationReportFile(deviceType);
    }
    getCustomerReportFile(deviceType, name) {
        return this.blockingRepository.getCustomerReportFile(deviceType, name);
    }
    listImports(data) {
        return this.blockingRepository.listImports(data);
    }
}
exports.default = BlockingService;
