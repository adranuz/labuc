import { ImportBlockingDTO, ImportBlockingResponseDTO } from '../dto/blocking.dto';

export default interface IBlockingRepository {
  importBlocking(data: ImportBlockingDTO): Promise<ImportBlockingResponseDTO>;
  reportBlocking(): Promise<any>;
  getActivationReport(): Promise<any>;
  getActivationReportFile(): Promise<any>;
  getCustomerReport(name: string): Promise<any>;
}
