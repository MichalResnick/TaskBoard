import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CustomerModel from "../4-models/customer-model";
import EmployeeModel from "../4-models/employee-model";
import TaskModel from "../4-models/task-model";

async function getAllEmployees():Promise<EmployeeModel[]>{
    const sql=`SELECT * FROM employees`
    const employees=await dal.execute(sql)
    return employees
}

async function getAllCustomers():Promise<CustomerModel[]>{
    const sql=`SELECT * FROM customers`
    const customers=await dal.execute(sql)
    return customers
}

async function getAllTasks():Promise<TaskModel[]>{
    const sql=`SELECT * FROM tasks`
    const tasks=await dal.execute(sql)
    return tasks
}


async function getAllTasksByEmployeeName(id:number):Promise<TaskModel[]>{
   
    const sql=`
    SELECT T.*,E.employeeName
    FROM tasks AS T JOIN employees AS E
    ON T.employeeId=E.employeeId
    WHERE T.employeeId=? `

    const tasksByEmployee=await dal.execute(sql,[id])
    return tasksByEmployee
}

async function getAllTasksByCustomerName(customerId:number):Promise<TaskModel[]>{
   
    const sql=`
    SELECT T.*,C.customerName
    FROM tasks AS T JOIN customers AS C
    ON T.customerId=C.customerId
    WHERE T.customerId=? `

    console.log("idlogic" +customerId)

    const tasksByCustomer=await dal.execute(sql,[customerId])
    return tasksByCustomer
}

async function addTask(task:TaskModel):Promise<TaskModel> {
    const sql=`
    INSERT INTO tasks(item,customerId,status,date,priority,employeeId)  VALUES (?, ?, ?, ?, ?, ?) `
    
    const values=[task.item,task.customerId,task.status,task.date,task.priority,task.employeeId]
    const info:OkPacket=await dal.execute(sql,values)

    task.taskId=info.insertId

    return task
    
}


export default {
    
    getAllEmployees,
    getAllCustomers,
    getAllTasks,
    getAllTasksByEmployeeName,
    getAllTasksByCustomerName,
    addTask

};
