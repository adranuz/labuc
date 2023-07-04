"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
        // createCustomer = async (
        //   req: Request<{}, {}, CreateCustomerInput>,
        //   res: Response
        // ): Promise<unknown> => {
        //   try {
        //     const createdCustomer = await this.customerService.createCustomer(req.body)
        //     res.status(201).json(createdCustomer)
        //   } catch (err) {
        //     console.log('Unable to create customer:', err)
        //     return res.status(500).json({
        //       error: {
        //         code: 500,
        //         message: 'Server Internal Error',
        //         details: 'Unable to create customer',
        //       },
        //     })
        //   }
        // }
        this.getCustomer = async (req, res) => {
            try {
                const { id } = req.params;
                const customer = await this.customerService.getCustomer(id);
                res.status(200).json(customer);
            }
            catch (err) {
                console.log('Unable to get customer:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get customer',
                    },
                });
            }
        };
        this.updateCustomer = async (req, res) => {
            try {
                const { id } = req.params;
                const customer = await this.customerService.updateCustomer(id, req.body);
                res.status(200).json(customer);
            }
            catch (err) {
                console.log('Unable to update customer:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to update customer',
                    },
                });
            }
        };
        this.deleteCustomer = async (req, res, next) => {
            try {
                const { id } = req.params;
                const customer = await this.customerService.deleteCustomer(id);
                res.status(200).json(customer);
            }
            catch (err) {
                next(err);
            }
        };
        this.listCustomers = async (req, res) => {
            try {
                const customers = await this.customerService.listCustomers(req.query);
                res.status(200).json(customers);
            }
            catch (err) {
                console.log('Unable to get customers:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get customers',
                    },
                });
            }
        };
        this.listProducts = async (req, res) => {
            try {
                const customers = await this.customerService.listProducts(req.query);
                res.status(200).json(customers);
            }
            catch (err) {
                console.log('Unable to get products:', err);
                return res.status(500).json({
                    error: {
                        code: 500,
                        message: 'Server Internal Error',
                        details: 'Unable to get products',
                    },
                });
            }
        };
    }
}
exports.default = CustomerController;
