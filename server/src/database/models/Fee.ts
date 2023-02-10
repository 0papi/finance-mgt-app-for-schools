import { Schema, model, Types, Date } from "mongoose";

/**
 * @description states all fields for fee schema
 */

const FEE_DOCUMENT_NAME = "Fee";

interface IFee {
  feeType: string;
  student: Types.ObjectId;
  institution: Types.ObjectId;
  amount: number;
  datePaid: Date;
}

const FeeSchema = new Schema<IFee>({
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  datePaid: {
    type: Schema.Types.Date,
    required: true,
  },
});

export const Fee = model(FEE_DOCUMENT_NAME, FeeSchema);
