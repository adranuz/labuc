"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    // createCustomer(data: CreateCustomerDTO): Promise<PublicCustomerDTO> {
    //   return this.customerRepository.createCustomer(data);
    // }
    getCustomer(id) {
        return this.customerRepository.getCustomer(id);
    }
    updateCustomer(id, data) {
        return this.customerRepository.updateCustomer(id, data);
    }
    deleteCustomer(id) {
        return this.customerRepository.deleteCustomer(id);
    }
    listCustomers(data) {
        return this.customerRepository.listCustomers(data);
    }
    listProducts(data) {
        return this.customerRepository.listProducts(data);
    }
}
exports.default = CustomerService;
