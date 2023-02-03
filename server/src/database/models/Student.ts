import { Schema, Types, model } from "mongoose";

const DOCUMENT_NAME = "Student";

const StudentSchema = new Schema({
  class: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  firstName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
  },
});

export const StudentModel = model(DOCUMENT_NAME, StudentSchema);
