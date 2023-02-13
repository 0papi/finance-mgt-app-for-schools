import { Schema, model, Types } from "mongoose";

const STUDENT_DOCUMENT_NAME = "Student";

interface IStudent {
  _id: Types.ObjectId;
  studentClass: string;
  firstName: string;
  lastName: string;
  otherName: string;
  location: string;
  institution: Types.ObjectId,
  createdAt: Schema.Types.Date
}

const StudentSchema = new Schema({
  studentClass: {
    type: Schema.Types.String,
    required: true,
  },
  firstName: {
    type: Schema.Types.String,
    required: true,
  },
  otherName: {
    type: Schema.Types.String,
    required: false,
  },
  location: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    select: false,
  },
});

export const Student = model(STUDENT_DOCUMENT_NAME, StudentSchema);
