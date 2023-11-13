import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import EmployeeModel from "../4-models/employee-model"
import { ResourceNotFoundErrorModel } from "../4-models/error-models"


async function getAllEmployees():Promise<EmployeeModel[]>{
    const sql=`SELECT * FROM employees`
    const employees=await dal.execute(sql)
    return employees
}

async function addEmployee(employee:EmployeeModel):Promise<EmployeeModel> {
    const sql=`
    INSERT INTO employees( employeeName)  VALUES (?) `
    
    const values=[employee.employeeName]
    const info:OkPacket=await dal.execute(sql,values)

    employee.employeeId=info.insertId

    return employee
    
}

async function updateEmployee(employee:EmployeeModel):Promise<EmployeeModel> {
    const sql=`
   UPDATE employees SET 
   employeeName=?
   WHERE employeeId=? `
    
    const values=[employee.employeeName,employee.employeeId]
    const info:OkPacket=await dal.execute(sql,values)
    if (info.affectedRows===0) throw new ResourceNotFoundErrorModel(employee.employeeId)

    return employee    
}

async function deleteEmployee(employeeId:number):Promise<void>{
    const sql=`
    DELETE FROM employees
    WHERE employeeId=?
    `
    const info:OkPacket=await dal.execute(sql,[employeeId])
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(employeeId)

}

export default{
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
}