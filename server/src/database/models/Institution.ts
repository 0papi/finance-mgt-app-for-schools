/**
 * @description states all data fields required to create an institution account
 */
export const DOCUMENT_NAME = "Institution";
import { model, Schema, Types } from "mongoose";

export interface IInstitute {
  _id: Types.ObjectId;
  name: string;
  location: string;
  phone: number;
  institutionNumber: string;
  password: string;
  email: string;
  verified: boolean;
  typeOfInstitution: string;
  phoneOfPersonRegistering: number;
  positionOfPersonRegistering: string;
  nameOfPersonRegistering: string;
}

const InstitutionSchema = new Schema<IInstitute>({
  location: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  phone: {
    type: Schema.Types.Number,
    unique: true,
    required: true,
  },
  institutionNumber: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    select: false,
  },
  verified: {
    type: Schema.Types.Boolean,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
  },
  typeOfInstitution: {
    type: Schema.Types.String,
  },
  phoneOfPersonRegistering: {
    type: Schema.Types.Number,
  },
  positionOfPersonRegistering: {
    type: Schema.Types.String,
  },
  nameOfPersonRegistering: {
    type: Schema.Types.String,
  },
});

export const Institution = model<IInstitute>(DOCUMENT_NAME, InstitutionSchema);
