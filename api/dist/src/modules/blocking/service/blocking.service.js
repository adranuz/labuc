"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockingService {
    constructor(blockingRepository) {
        this.blockingRepository = blockingRepository;
    }
    createBlockingReport(data) {
        return this.blockingRepository.createBlockingReport(data);
    }
    listBlockingReport(data) {
        return this.blockingRepository.listBlockingReport(data);
    }
    getBlockingDevice(id) {
        return this.blockingRepository.getBlockingDevice(id);
    }
    getBlockingDeviceImportLog(id, type) {
        return this.blockingRepository.getBlockingDeviceImportLog(id, type);
    }
    createBlockingDeviceConsolidatedReport(id) {
        return this.blockingRepository.createBlockingDeviceConsolidatedReport(id);
    }
    getBlockingDeviceConsolidatedReport(id, deviceType) {
        return this.blockingRepository.getBlockingDeviceConsolidatedReport(id, deviceType);
    }
    getBlockingDeviceConsolidatedReportFile(id, deviceType) {
        return this.blockingRepository.getBlockingDeviceConsolidatedReportFile(id, deviceType);
    }
    getCustomerReportFile(id, name, deviceType) {
        return this.blockingRepository.getCustomerReportFile(id, name, deviceType);
    }
}
exports.default = BlockingService;
