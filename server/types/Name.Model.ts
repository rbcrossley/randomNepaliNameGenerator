import {Document, Schema} from "mongoose"

export interface Name extends Document {
    name: string
    name_np?: string
    meaning: string
    meaning_np?: string | null
    gender: String
    verifiedBy?: Schema.Types.ObjectId
    verifiedAt?: Date
    createdAt: Date
    createdBy?: Schema.Types.ObjectId
    updatedAt: Date
    deletedAt?: Date
}
