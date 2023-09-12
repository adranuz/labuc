import Option from '../../common/types/Option.type';
import IPacRepository from './IPacRepository';
import {
  getPacCustomerCreditStatsDTO,
  getPacCustomerCreditStatsResponseDTO,
  getPacCustomerCreditReportDTO,
  getPacCustomerCreditReportResponseDTO,
  getPacCustomerScoreReportDTO,
  getPacCustomerScoreReportResponseDTO
} from '../dto/pac.dto';

export default class PacService {
  constructor(private pacRepository: IPacRepository) { }

  getPacCustomerCreditStats (data: getPacCustomerCreditStatsDTO): Promise<Option<getPacCustomerCreditStatsResponseDTO>> {
    return this.pacRepository.getPacCustomerCreditStats(data);
  }

  getPacCustomerCreditReport (data: getPacCustomerCreditReportDTO): Promise<Option<getPacCustomerCreditReportResponseDTO>> {
    return this.pacRepository.getPacCustomerCreditReport(data);
  }

  getPacCustomerCreditReportFile (data: getPacCustomerCreditReportDTO): Promise<any> {
    return this.pacRepository.getPacCustomerCreditReportFile(data);
  }

  getPacCustomerScoreReport (data: getPacCustomerScoreReportDTO): Promise<Option<getPacCustomerScoreReportResponseDTO>> {
    return this.pacRepository.getPacCustomerScoreReport(data);
  }

  getPacCustomerScoreReportFile (data: getPacCustomerScoreReportDTO): Promise<any> {
    return this.pacRepository.getPacCustomerScoreReportFile(data);
  }
}
