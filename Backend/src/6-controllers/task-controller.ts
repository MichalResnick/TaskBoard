import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/task-logic";
import taskLogic from "../5-logic/task-logic";
import TaskModel from "../4-models/task-model";
import employeesLogic from "../5-logic/employees-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____


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

router.post("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const task=new TaskModel(request.body)
    const addedTask=await taskLogic.addTask(task)
    response.status(201).json(addedTask)
    
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/tasks/:taskId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    request.body.taskId=+request.params.taskId
    const task=new TaskModel(request.body)
    const updatedTask=await taskLogic.updateTask(task)
    response.status(201).json(updatedTask)
    
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/tasks/:taskId", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const taskId=+request.params.taskId
    await taskLogic.deleteTask(taskId)
    response.sendStatus(204)
    
    }
    catch (err: any) {
        next(err);
    }
});



export default router;