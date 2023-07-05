import Option from '../../common/types/Option.type';
import { ImportBlockingDTO, ImportBlockingResponseDTO, PaginationFilterDTO, PublicImportsDTO } from '../dto/blocking.dto';

export default interface IBlockingRepository {
  importBlocking(data: ImportBlockingDTO): Promise<ImportBlockingResponseDTO>;
  createActivationReport(): Promise<any>;
  getActivationReport(deviceType: string | undefined): Promise<any>;
  getActivationReportFile(): Promise<any>;
  getCustomerReport(name: string): Promise<any>;
  listImports(data: PaginationFilterDTO): Promise<Option<PublicImportsDTO>>;
}
