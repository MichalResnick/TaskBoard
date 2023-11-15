import axios from "axios";
import TaskModel from "../Models/Task-Model";
import appConfig from "../Utils/Config";
import CustomerModel from "../Models/Customers-Model";
import EmployeeModel from "../Models/Employee-Model";

class DataService {

   public async  getAllTasks():Promise<TaskModel[]>{

    const response=await axios.get<TaskModel[]>(appConfig.TasksUrl)
    const tasks=response.data
    return tasks
   }

   public async getAllTasksByEmployeeName(id:number):Promise<TaskModel[]>{
    const response=await axios.get<TaskModel[]>(appConfig.TasksByEmployeeUrl+id)
    const tasksByEmployeeName=response.data
    return tasksByEmployeeName
   }

   public async getAllTasksByCustomerName(id:number):Promise<TaskModel[]>{
    const response=await axios.get<TaskModel[]>(appConfig.TasksByCustomerUrl+id)
    const tasksByCustomerName=response.data
    return tasksByCustomerName
   }

       
   public async addTask(task:TaskModel):Promise<void>{
    await axios.post<TaskModel>(appConfig.TasksUrl,task)
 }

 public async  updateTaskStatus(taskId:number,status:string):Promise<void>{
   await axios.patch(appConfig.UpdateStatusUrl+taskId,status)
 }

 public async  updateTaskPriority(taskId:number,priority:string):Promise<void>{
   await axios.patch(appConfig.UpdatePriorityUrl+taskId,priority)
 }

public async updatetask(task:TaskModel):Promise<void>{
    await axios.put<TaskModel>(appConfig.TasksUrl,task)
 }

 public async deletetask(taskId:number):Promise<void>{
    await axios.delete<TaskModel>(appConfig.TasksUrl+taskId)
 }

 public async addCustomer(customer:CustomerModel):Promise<void>{
    await axios.post<CustomerModel>(appConfig.CustomersUrl,customer)
 }

public async updatecustomer(customer:CustomerModel):Promise<void>{
    await axios.put<CustomerModel>(appConfig.CustomersUrl,customer)
 }

 public async deletecustomer(customerId:number):Promise<void>{
    await axios.delete<CustomerModel>(appConfig.CustomersUrl+customerId)
 }

 public async addEmployee(employee:EmployeeModel):Promise<void>{
    await axios.post<EmployeeModel>(appConfig.EmployeesUrl,employee)
 }

public async updateEmployee(employee:EmployeeModel):Promise<void>{
    await axios.put<EmployeeModel>(appConfig.EmployeesUrl,employee)
 }

 public async deleteEmployee(employeeId:number):Promise<void>{
    await axios.delete<EmployeeModel>(appConfig.EmployeesUrl+employeeId)
 }


}

const dataService = new DataService();

export default dataService;