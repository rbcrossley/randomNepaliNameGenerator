import mongoose from "mongoose";

const { Schema, model } = mongoose;

const nameSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  userType: { type: String | null, required: false },
  disabledAt: { type: Date, required: false },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: { type: Date, required: false },
  deletedBy: { type: Date, required: false },
});
