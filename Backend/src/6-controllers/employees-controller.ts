import express, { Request, Response, NextFunction } from "express";
import employeesLogic from "../5-logic/employees-logic";
import EmployeeModel from "../4-models/employee-model";


const router = express.Router(); // Capital R

router.get("/tasks/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees=await employeesLogic.getAllEmployees()
        response.json(employees)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/tasks/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const employee=new EmployeeModel(request.body)
    const addedEmployee=await employeesLogic.addEmployee(employee)
    response.status(201).json(addedEmployee)
    
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/tasks/employees/:employeeId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    request.body.employeeId=+request.params.employeeId
    const employee=new EmployeeModel(request.body)
    const updatedEmployee=await employeesLogic.updateEmployee(employee)
    response.status(201).json(updatedEmployee)
    
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/tasks/employees/:employeeId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const employeeId=+request.params.employeeId
    await employeesLogic.deleteEmployee(employeeId)
    response.sendStatus(204)
    
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
