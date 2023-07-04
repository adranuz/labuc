"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_schema_1 = require("./customer.schema");
exports.default = (cradle) => {
    const router = (0, express_1.Router)();
    router.get('/customers', cradle.customerMiddleware.validate(customer_schema_1.paginationFilterSchema), cradle.customerController.listCustomers);
    // router.post('/customers', cradle.customerMiddleware.validate(createCustomerSchema), cradle.customerMiddleware.requireEmailDoesNotExist, cradle.customerController.createCustomer);
    router.get('/customers/:id', cradle.customerMiddleware.validate(customer_schema_1.getCustomerSchema), cradle.customerController.getCustomer);
    router.put('/customers/:id', cradle.customerMiddleware.validate(customer_schema_1.updateCustomerSchema), cradle.customerController.updateCustomer);
    router.delete('/customers/:id', cradle.customerMiddleware.validate(customer_schema_1.deleteCustomerSchema), cradle.customerController.deleteCustomer);
    router.get('/products', cradle.customerMiddleware.validate(customer_schema_1.paginationFilterSchema), cradle.customerController.listProducts);
    return router;
};
