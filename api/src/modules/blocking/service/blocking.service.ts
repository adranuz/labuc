import { ImportBlockingDTO, ImportBlockingResponseDTO } from '../dto/blocking.dto';
import IBlockingRepository from './IBlockingRepository';

export default class BlockingService {
  constructor(private blockingRepository: IBlockingRepository) {}

  importBlocking(data: ImportBlockingDTO): Promise<ImportBlockingResponseDTO> {
    return this.blockingRepository.importBlocking(data);
  }

  reportBlocking(): Promise<any> {
    return this.blockingRepository.reportBlocking();
  }

  getActivationReport(): Promise<any> {
    return this.blockingRepository.getActivationReport();
  }

  getActivationReportFile(): Promise<any> {
    return this.blockingRepository.getActivationReportFile();
  }

  getCustomerReport(name: string): Promise<any> {
    return this.blockingRepository.getCustomerReport(name);
  }
}
