import Option from '../../common/types/Option.type';
import {
  getPacCustomerCreditStatsDTO,
  getPacCustomerCreditStatsResponseDTO,
  getPacCustomerCreditReportDTO,
  getPacCustomerCreditReportResponseDTO,
  getPacCustomerScoreReportDTO,
  getPacCustomerScoreReportResponseDTO
} from '../dto/pac.dto';

export default interface IPacRepository {
  getPacCustomerCreditStats (data: getPacCustomerCreditStatsDTO): Promise<Option<getPacCustomerCreditStatsResponseDTO>>;
  getPacCustomerCreditReport (data: getPacCustomerCreditReportDTO): Promise<Option<getPacCustomerCreditReportResponseDTO>>;
  getPacCustomerCreditReportFile (data: getPacCustomerCreditReportDTO): Promise<any>;
  getPacCustomerScoreReport (data: getPacCustomerScoreReportDTO): Promise<Option<getPacCustomerScoreReportResponseDTO>>;
  getPacCustomerScoreReportFile (data: getPacCustomerScoreReportDTO): Promise<any>;
}
