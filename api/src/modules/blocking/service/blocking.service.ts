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

  getNuovoReport (id: string): Promise<any> {
    return this.blockingRepository.getNuovoReport(id);
  }

  getNuovoReportLog (id: string, type: string): Promise<any> {
    return this.blockingRepository.getNuovoReportLog(id, type);
  }

  createNuovoReportConsolidated (id: string): Promise<any> {
    return this.blockingRepository.createNuovoReportConsolidated(id);
  }

  getNuovoReportConsolidated (id: string, deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getNuovoReportConsolidated(id, deviceType);
  }

  getNuovoReportConsolidatedFile (id: string, deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getNuovoReportConsolidatedFile(id, deviceType);
  }

  getCustomerReportFile (id: string, name: string, deviceType: string | undefined): Promise<any> {
    return this.blockingRepository.getCustomerReportFile(id, name, deviceType);
  }
}
