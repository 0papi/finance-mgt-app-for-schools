import { Schema, model, Types } from "mongoose";

/**
 * @description states all fields for fee schema
 */

const FEE_DOCUMENT_NAME = "Fee";

const FeeSchema = new Schema({
  feeType: {
    type: Types.ObjectId,
    ref: "FeeType",
    unique: true,
    required: true,
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
  student: {
    type: Types.ObjectId,
    ref: "Student",
    unique: true,
    required: true,
  },
});

export const FeeModel = model(FEE_DOCUMENT_NAME, FeeSchema);
