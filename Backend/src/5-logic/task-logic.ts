import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CustomerModel from "../4-models/customer-model";
import EmployeeModel from "../4-models/employee-model";
import TaskModel from "../4-models/task-model";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";



async function getAllTasks():Promise<TaskModel[]>{
    const sql=`SELECT 
    tasks.*,
    employees.employeeName AS employeeName,
    customers.customerName AS customerName,
    DATE_FORMAT(tasks.date, '%Y-%m-%d') AS date
    FROM tasks
    JOIN employees ON tasks.employeeId = employees.employeeId
    JOIN customers ON tasks.customerId = customers.customerId;`
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

async function updateTaskStatus(taskId:number,status:string):Promise<void>{
    console.log("here1")
    const sql = `UPDATE tasks SET status = ? WHERE taskId = ?`
    console.log("here2");
    const info:OkPacket = await dal.execute(sql ,[status,taskId])
    console.log("here2")
    if ( info.affectedRows===0) throw new ResourceNotFoundErrorModel(taskId)
  
}

async function updateTaskPriority(taskId:number,priority:string):Promise<void>{
    const sql = `UPDATE tasks SET priority = ? WHERE taskId = ?`
    const info:OkPacket = await dal.execute(sql ,[priority,taskId])
    if ( info.affectedRows===0) throw new ResourceNotFoundErrorModel(taskId)
   
}

async function updateTask(task:TaskModel):Promise<TaskModel> {
    const sql=`
   UPDATE tasks SET 
   item=?,
   customerId=?,
   status=?,
   date=?,
   priority=?,
   employeeId=?
   WHERE taskId=? `
    
    const values=[task.item,task.customerId,task.status,task.date,task.priority,task.employeeId, task.taskId]
    const info:OkPacket=await dal.execute(sql,values)
    if (info.affectedRows===0) throw new ResourceNotFoundErrorModel(task.taskId)
  

    return task    
}

async function deleteTask(TaskId:number):Promise<void>{
    const sql=`
    DELETE FROM tasks
    WHERE taskId=?
    `
    const info:OkPacket=await dal.execute(sql,[TaskId])
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(TaskId)

}


export default {
    
    getAllTasks,
    getAllTasksByEmployeeName,
    getAllTasksByCustomerName,
    addTask,
    updateTaskStatus,
    updateTaskPriority,
    updateTask,
    deleteTask
};
