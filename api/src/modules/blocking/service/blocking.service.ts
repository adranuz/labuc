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

  getActivationReportFile(deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getActivationReportFile(deviceType);
  }

  getCustomerReportFile(deviceType: string | undefined, name: string): Promise<any> {
    return this.blockingRepository.getCustomerReportFile(deviceType, name);
  }

  listImports(data: PaginationFilterDTO): Promise<Option<PublicImportsDTO>> {
    return this.blockingRepository.listImports(data);
  }
}
