import { Customer } from "@interfaces/Customer";

export class CustomerData {
    static readonly validCustomers: Customer[] = [
        {
            firstName: "John",
            lastName: "Doe",
            postalCode: "90210",
            error: ""
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            postalCode: "10001",
            error: ""
        },
    ];

    static readonly invalidCustomers: Customer[] = [
        {
            firstName: "",
            lastName: "Doe",
            postalCode: "90210",
            error: "First Name is required"
        },

        {
            firstName: "John",
            lastName: "",
            postalCode: "90210",
            error: "Last Name is required"
        },

        {
            firstName: "John",
            lastName: "Doe",
            postalCode: "",
            error: "Postal Code is required"
        },

        {
            firstName: "",
            lastName: "",
            postalCode: "",
            error: "First Name is required"
        },
    ]
}