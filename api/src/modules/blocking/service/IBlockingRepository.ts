import Option from '../../common/types/Option.type';
import { CreateBlockingReportDTO, ListBlockingReportDTO, CreateBlockingReportResponseDTO, ListBlockingReportResponseDTO } from '../dto/blocking.dto';

export default interface IBlockingRepository {
  createBlockingReport (data: CreateBlockingReportDTO): Promise<CreateBlockingReportResponseDTO>;
  listBlockingReport (data: ListBlockingReportDTO): Promise<Option<ListBlockingReportResponseDTO>>;
  getNuovoReport (id: string): Promise<any>;
  getNuovoReportLog (id: string, type: string): Promise<any>;

  createNuovoReportConsolidated (id: string): Promise<any>;
  getNuovoReportConsolidated (id: string, deviceType: string | undefined): Promise<any>;
  getNuovoReportConsolidatedFile (id: string, deviceType: string | undefined): Promise<any>;
  getCustomerReportFile (deviceType: string | undefined, name: string): Promise<any>;
}
