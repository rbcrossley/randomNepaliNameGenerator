import { Schema, Document, model, SchemaTypes } from "mongoose";
import { Gender } from "../types/Gender";

interface NameTypes extends Document {
  name: string;
  name_np?: string;
  meaning: string;
  meaning_np?: string | null;
  gender: String;
  verifiedBy?: Schema.Types.ObjectId;
  verifiedAt?: Date;
  createdAt: Date;
  createdBy?: Schema.Types.ObjectId;
  updatedAt: Date;
  deletedAt?: Date;
}

const nameSchema = new Schema<NameTypes>({
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
    enum: [Gender.Male, Gender.Female, Gender.Others],
    default: Gender.Male,
  },
  verifiedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: false,
  },
  verifiedAt: { type: Date, required: false },
  createdAt: Date,
  createdBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: false,
  },
  updatedAt: Date,
  deletedAt: { type: Date, required: false },
});

const Name = model<NameTypes>("Name", nameSchema);

export default Name;
