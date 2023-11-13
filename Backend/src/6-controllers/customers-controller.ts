import express, { Request, Response, NextFunction } from "express";
import employeesLogic from "../5-logic/employees-logic";
import EmployeeModel from "../4-models/employee-model";
import customersLogic from "../5-logic/customers-logic";
import CustomerModel from "../4-models/customer-model";


const router = express.Router(); // Capital R

router.get("/tasks/customers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customers=await customersLogic.getAllCustomers()
        response.json(customers)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/tasks/customers", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const customer=new CustomerModel(request.body)
    const addedCustomer=await customersLogic.addCustomer(customer)
    response.status(201).json(addedCustomer)
    
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/tasks/customers/:customerId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    request.body.customerId=+request.params.customerId
    const customer=new CustomerModel(request.body)
    const updatedCustomer=await customersLogic.updateCustomer(customer)
    response.status(201).json(updatedCustomer)
    
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/tasks/customers/:customerId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const customerId=+request.params.customerId
    await customersLogic.deleteCustomer(customerId)
    response.sendStatus(204)
    
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
