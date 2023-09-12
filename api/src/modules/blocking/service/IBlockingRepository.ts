import Option from '../../common/types/Option.type';
import { CreateBlockingReportDTO, ListBlockingReportDTO, CreateBlockingReportResponseDTO, ListBlockingReportResponseDTO } from '../dto/blocking.dto';

export default interface IBlockingRepository {
  createBlockingReport (data: CreateBlockingReportDTO): Promise<CreateBlockingReportResponseDTO>;
  listBlockingReport (data: ListBlockingReportDTO): Promise<Option<ListBlockingReportResponseDTO>>;
  getBlockingDevice (id: string): Promise<any>;
  getBlockingDeviceImportLog (id: string, type: string): Promise<any>;

  createBlockingDeviceConsolidatedReport (id: string): Promise<any>;
  getBlockingDeviceConsolidatedReport (id: string, deviceType: string | undefined): Promise<any>;
  getBlockingDeviceConsolidatedReportFile (id: string, deviceType: string | undefined): Promise<any>;
  getCustomerReportFile (id: string, name: string, deviceType: string | undefined): Promise<any>;
}
