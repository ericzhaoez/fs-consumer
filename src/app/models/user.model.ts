export class User{
    id: number;
    public firstname: string;
    public lastname: string;
    public email: string;
    password: string;
    public city: string;
    public country: string;
    public phone: string;
    public bookings: number;
    // public fullname: string;

    // private age: number;

    constructor() {
        this.firstname = "";
        this.lastname = "";
        // this.city = "";
        // this.country = "";
        this.email = "";
        this.password = "";
        // this.phone = "";
    }

    public setFirstname(firstname:string){
        this.firstname = firstname;
    }

    // public setDateOfBirth(dob: Date) {
    //     // Calculate the age
    //     this.age = 55;
    // }

    // public getAge() {
    //     return this.age;
    // }
}