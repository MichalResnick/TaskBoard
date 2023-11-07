
class TaskModel{
   public taskId:number
   public item:string
   public customerId:number
   public status:string
   public date:string
   public priority:string
   public employeeId:number

   public constructor(taskModel:TaskModel){
    this.taskId=taskModel.taskId
    this.item=taskModel.item
    this.customerId=taskModel.customerId
    this.status=taskModel.status
    this.date=taskModel.date
    this.priority=taskModel.priority
    this.employeeId=taskModel.employeeId
   }
}

export default TaskModel