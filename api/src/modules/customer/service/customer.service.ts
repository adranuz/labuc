import Option from '../../common/types/Option.type';
import {
  // CreateCustomerDTO,
  UpdateCustomerDTO, PublicCustomerDTO, PaginationFilterDTO, PublicCustomersDTO, PublicProductsDTO, ListCustomersDTO
} from '../dto/customer.dto';
import ICustomerRepository from './ICustomerRepository';

export default class CustomerService {
  constructor(private customerRepository: ICustomerRepository) { }

  // createCustomer(data: CreateCustomerDTO): Promise<PublicCustomerDTO> {
  //   return this.customerRepository.createCustomer(data);
  // }

  getCustomer (id: string): Promise<Option<PublicCustomerDTO>> {
    return this.customerRepository.getCustomer(id);
  }

  updateCustomer (id: string, data: UpdateCustomerDTO): Promise<Option<PublicCustomerDTO>> {
    return this.customerRepository.updateCustomer(id, data);
  }

  deleteCustomer (id: string): Promise<Option<PublicCustomerDTO>> {
    return this.customerRepository.deleteCustomer(id);
  }

  listCustomers (data: ListCustomersDTO): Promise<Option<PublicCustomersDTO>> {
    return this.customerRepository.listCustomers(data);
  }

  listProducts (data: PaginationFilterDTO): Promise<Option<PublicProductsDTO>> {
    return this.customerRepository.listProducts(data);
  }
}
