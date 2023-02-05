import { Schema, model, Types } from "mongoose";

const FEETYPE_NAME = "FeeType";

const FeeTypeSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  institution: {
    type: Types.ObjectId,
    ref: "Institution",
    required: true,
    unique: true,
  },
});

export const FeeTypeModel = model(FEETYPE_NAME, FeeTypeSchema);
