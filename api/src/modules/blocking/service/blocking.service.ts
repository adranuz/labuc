import Option from '../../common/types/Option.type';
import { ImportBlockingDTO, ImportBlockingResponseDTO, PaginationFilterDTO, PublicImportsDTO } from '../dto/blocking.dto';
import IBlockingRepository from './IBlockingRepository';

export default class BlockingService {
  constructor(private blockingRepository: IBlockingRepository) {}

  importBlocking(data: ImportBlockingDTO): Promise<ImportBlockingResponseDTO> {
    return this.blockingRepository.importBlocking(data);
  }

  createActivationReport(): Promise<any> {
    return this.blockingRepository.createActivationReport();
  }

  getActivationReport(deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getActivationReport(deviceType);
  }

  getActivationReportFile(): Promise<any> {
    return this.blockingRepository.getActivationReportFile();
  }

  getCustomerReport(name: string): Promise<any> {
    return this.blockingRepository.getCustomerReport(name);
  }

  listImports(data: PaginationFilterDTO): Promise<Option<PublicImportsDTO>> {
    return this.blockingRepository.listImports(data);
  }
}
