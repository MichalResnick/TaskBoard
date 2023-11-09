import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/task-logic";
import taskLogic from "../5-logic/task-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
router.get("/tasks/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees=await taskLogic.getAllEmployees()
        response.json(employees)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/tasks/customers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customers=await taskLogic.getAllCustomers()
        response.json(customers)
    }
    catch (err: any) {
        next(err);
    }
});
router.get("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tasks=await taskLogic.getAllTasks()
        response.json(tasks)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/tasks-by-employee/:employeeId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const employeeId=+request.params.employeeId
       console.log(employeeId+"id")
       const tasksByEmployee=await taskLogic.getAllTasksByEmployeeName(employeeId)
       response.json(tasksByEmployee)

    }
    catch (err: any) {
        next(err);
    }
});

router.get("/tasks-by-customer/:customerId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const customerId=+request.params.customerId
       console.log(customerId+"customerId")
       const tasksByCustomer=await taskLogic.getAllTasksByEmployeeName(customerId)
       response.json(tasksByCustomer)

    }
    catch (err: any) {
        next(err);
    }
});



export default router;