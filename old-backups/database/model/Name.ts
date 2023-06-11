import mongoose from 'mongoose'
import {Gender} from "../../types/Gender";

const {Schema, SchemaTypes, model} = mongoose;

const nameSchema = new Schema({
    name: String,
    name_np: {
        type: String,
        required: false,
    },
    gender: {
        type: Gender,
        default: Gender.Male,
    },
    verifiedBy: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
    },
    verifiedAt: {type: Date, required: false},
    createdAt: Date,
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: false,
    },
    updatedAt: Date,
    deletedAt: {type: Date, required: false}
})

const Name = model('Name', nameSchema)

export default Name
