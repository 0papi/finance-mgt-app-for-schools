import { Schema, model } from "mongoose";

const STUDENT_DOCUMENT_NAME = "Student";

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
  createdAt: {
    type: Schema.Types.Date,
    select: false,
  },
});

export const StudentModel = model(STUDENT_DOCUMENT_NAME, StudentSchema);
