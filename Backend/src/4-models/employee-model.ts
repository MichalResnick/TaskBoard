class EmployeeModel{
    public employeeId:number
    public employeeName:string

    public constructor(employee:EmployeeModel){
        this.employeeId=employee.employeeId
        this.employeeName=employee.employeeName
       }
}

export default EmployeeModel