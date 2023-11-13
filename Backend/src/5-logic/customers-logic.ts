import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import EmployeeModel from "../4-models/employee-model"
import { ResourceNotFoundErrorModel } from "../4-models/error-models"
import CustomerModel from "../4-models/customer-model"


async function getAllCustomers():Promise<CustomerModel[]>{
    const sql=`SELECT * FROM customers`
    const customers=await dal.execute(sql)
    return customers
}

async function addCustomer(customer:CustomerModel):Promise<CustomerModel> {
    const sql=`
    INSERT INTO customers( customerName)  VALUES (?) `
    
    const values=[customer.customerName]
    const info:OkPacket=await dal.execute(sql,values)

    customer.customerId=info.insertId

    return customer
    
}

async function updateCustomer(customer:CustomerModel):Promise<CustomerModel> {
    const sql=`
   UPDATE customers SET 
   customerName=?,
   email=?
   WHERE customerId=? `
    
    const values=[customer.customerName,customer.email,customer.customerId]
    const info:OkPacket=await dal.execute(sql,values)
    if (info.affectedRows===0) throw new ResourceNotFoundErrorModel(customer.customerId)

    return customer    
}

async function deleteCustomer(customerId:number):Promise<void>{
    const sql=`
    DELETE FROM customers
    WHERE customerId=?
    `
    const info:OkPacket=await dal.execute(sql,[customerId])
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(customerId)

}

export default{
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
}