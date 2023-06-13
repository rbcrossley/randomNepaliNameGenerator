import {Document} from "mongoose"

export interface User extends Document {
    fullName: String
    email: String
    password: String
    userType?: UserType | null
    disabledAt?: Date
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}

export enum UserType {
    Admin = "admin",
    User = "user",
}
