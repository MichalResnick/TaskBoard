class Config {
    public TasksUrl = "http://localhost:3001/api/tasks";
    public EmployeesUrl = "http://localhost:3001/api/tasks/employees/";
    public CustomersUrl = "http://localhost:3001/api/tasks/customers/";
    public TasksByEmployeeUrl = "http://localhost:3001/api/tasks-by-employee/";
    public TasksByCustomerUrl = "http://localhost:3001/api/tasks-by-customer/"
}

const appConfig = new Config(); // Singleton

export default appConfig;
