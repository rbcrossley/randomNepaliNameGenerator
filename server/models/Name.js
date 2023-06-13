import {model, Model, Schema, SchemaTypes} from "mongoose"
// import {Gender} from "../types/Gender"
// import {Name} from "../types/Name.Model"

const nameSchema = new Schema({
    name: String,
    name_np: {
        type: String,
        required: false,
    },
    meaning: String,
    meaning_np: {
        type: String,
        default: null,
        required: false,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        default: "male",
    },
    verifiedBy: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: false,
    },
    verifiedAt: {type: Date, required: false},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {type: Date, required: false},
})

const Name = model("Name", nameSchema)

export default Name
