import Option from '../../common/types/Option.type';
import {
  // CreateCustomerDTO, 
  UpdateCustomerDTO, PaginationFilterDTO, PublicCustomerDTO, PublicCustomersDTO, PublicProductsDTO, ListCustomersDTO
} from '../dto/customer.dto';

export default interface ICustomerRepository {
  // createCustomer(data: CreateCustomerDTO): Promise<PublicCustomerDTO>;
  getCustomer (id: string): Promise<Option<PublicCustomerDTO>>;
  updateCustomer (id: string, data: UpdateCustomerDTO): Promise<Option<PublicCustomerDTO>>;
  deleteCustomer (id: string): Promise<Option<PublicCustomerDTO>>;
  listCustomers (data: ListCustomersDTO): Promise<Option<PublicCustomersDTO>>;
  listProducts (data: PaginationFilterDTO): Promise<Option<PublicProductsDTO>>;
}
