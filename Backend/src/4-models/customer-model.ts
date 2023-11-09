class CustomerModel{
    public customerId:number
    public customerName:string
    public email:string

    public constructor(customer:CustomerModel){
        this.customerId=customer.customerId
        this.customerName=customer.customerName
        this.email=customer.email
       }
}

export default CustomerModel