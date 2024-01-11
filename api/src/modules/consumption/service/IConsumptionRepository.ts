import Option from '../../common/types/Option.type';
// import {  } from '../dto/consumption.dto';

export default interface ICustomerRepository {
  sendConsumptionHubData(data: any): Promise<any>;
}
