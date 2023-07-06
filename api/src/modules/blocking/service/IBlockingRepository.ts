import Option from '../../common/types/Option.type';
import { ImportBlockingDTO, ImportBlockingResponseDTO, PaginationFilterDTO, PublicImportsDTO } from '../dto/blocking.dto';

export default interface IBlockingRepository {
  importBlocking(data: ImportBlockingDTO): Promise<ImportBlockingResponseDTO>;
  createActivationReport(): Promise<any>;
  getActivationReport(deviceType: string | undefined): Promise<any>;
  getActivationReportFile(deviceType: string | undefined): Promise<any>;
  getCustomerReportFile(deviceType: string | undefined, name: string): Promise<any>;
  listImports(data: PaginationFilterDTO): Promise<Option<PublicImportsDTO>>;
}
