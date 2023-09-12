import Option from '../../common/types/Option.type';
import { CreateBlockingReportDTO, ListBlockingReportDTO, CreateBlockingReportResponseDTO, ListBlockingReportResponseDTO } from '../dto/blocking.dto';
import IBlockingRepository from './IBlockingRepository';

export default class BlockingService {
  constructor(private blockingRepository: IBlockingRepository) { }

  createBlockingReport (data: CreateBlockingReportDTO): Promise<CreateBlockingReportResponseDTO> {
    return this.blockingRepository.createBlockingReport(data);
  }

  listBlockingReport (data: ListBlockingReportDTO): Promise<Option<ListBlockingReportResponseDTO>> {
    return this.blockingRepository.listBlockingReport(data);
  }

  getBlockingDevice (id: string): Promise<any> {
    return this.blockingRepository.getBlockingDevice(id);
  }

  getBlockingDeviceImportLog (id: string, type: string): Promise<any> {
    return this.blockingRepository.getBlockingDeviceImportLog(id, type);
  }

  createBlockingDeviceConsolidatedReport (id: string): Promise<any> {
    return this.blockingRepository.createBlockingDeviceConsolidatedReport(id);
  }

  getBlockingDeviceConsolidatedReport (id: string, deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getBlockingDeviceConsolidatedReport(id, deviceType);
  }

  getBlockingDeviceConsolidatedReportFile (id: string, deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getBlockingDeviceConsolidatedReportFile(id, deviceType);
  }

  getCustomerReportFile (id: string, name: string, deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getCustomerReportFile(id, name, deviceType);
  }
}
