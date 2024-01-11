import Option from '../../common/types/Option.type';
// import { CreateCustomerDTO } from '../dto/customer.dto';
import IConsumptionRepository from './IConsumptionRepository';

export default class ConsumptionService {
  constructor(private consumptionRepository: IConsumptionRepository) { }

  sendConsumptionHubData(data: any): Promise<any> {
    return this.consumptionRepository.sendConsumptionHubData(data);
  }
}
