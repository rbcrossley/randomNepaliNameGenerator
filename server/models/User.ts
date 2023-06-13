import {model, Model, Schema} from "mongoose"
import {User, UserType} from "../types/User.Model"

const nameSchema: Schema<User> = new Schema<User>({
    fullName: String,
    email: String,
    password: String,
    userType: {
        type: String,
        enum: [UserType.Admin, UserType.User],
        default: UserType.User,
    },
    disabledAt: {type: Date, required: false},
    createdAt: Date,
    updatedAt: Date,
    deletedAt: {type: Date, required: false},
})

const User: Model<User> = model<User>("User", nameSchema)

export default User
