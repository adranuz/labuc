import { NextFunction, Request, Response } from 'express';
import CustomerService from '../service/customer.service'
import {
  //  CreateCustomerInput,
  UpdateCustomerInput, DeleteCustomerInput, GetCustomerInput, PaginationInput, ListCustomerInput
} from './customer.schema'

export default class CustomerController {
  constructor(private customerService: CustomerService) { }

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

  getCustomer = async (
    req: Request<GetCustomerInput, {}, {}>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const customer = await this.customerService.getCustomer(id)

      res.status(200).json(customer)
    } catch (err) {
      console.log('Unable to get customer:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get customer',
        },
      })
    }
  }

  updateCustomer = async (
    req: Request<UpdateCustomerInput['params'], {}, UpdateCustomerInput['body']>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { id } = req.params
      const customer = await this.customerService.updateCustomer(id, req.body)

      res.status(200).json(customer)
    } catch (err) {
      console.log('Unable to update customer:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to update customer',
        },
      })
    }
  }

  deleteCustomer = async (
    req: Request<DeleteCustomerInput, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      const customer = await this.customerService.deleteCustomer(id)

      res.status(200).json(customer)
    } catch (err) {
      next(err);
    }
  }

  listCustomers = async (
    req: Request<{}, {}, {}, ListCustomerInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const customers = await this.customerService.listCustomers(req.query)

      res.status(200).json(customers)
    } catch (err) {
      console.log('Unable to get customers:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get customers',
        },
      })
    }
  }

  listProducts = async (
    req: Request<{}, {}, {}, PaginationInput>,
    res: Response
  ): Promise<unknown> => {
    try {
      const customers = await this.customerService.listProducts(req.query)

      res.status(200).json(customers)
    } catch (err) {
      console.log('Unable to get products:', err)

      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Internal Error',
          details: 'Unable to get products',
        },
      })
    }
  }
}
