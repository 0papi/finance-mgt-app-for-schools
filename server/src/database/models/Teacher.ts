import { userRoles } from "./../../types/userRoles";
import { model, Schema, Types } from "mongoose";

const TEACHER_DOCUMENT_NAME = "Teacher";

const TeacherSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    institution: {
      type: Types.ObjectId,
      ref: "Institution",
    },
    class: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      default: userRoles.TEACHER,
    },
  },
  { timestamps: true }
);

export const Teacher = model(TEACHER_DOCUMENT_NAME, TeacherSchema);
