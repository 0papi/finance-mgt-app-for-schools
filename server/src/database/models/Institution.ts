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
  password: string;
  email: string;
  verified: boolean;
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
  password: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  verified: {
    type: Schema.Types.Boolean,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
  },
});

export const InstitutionModel = model<IInstitute>(
  DOCUMENT_NAME,
  InstitutionSchema
);
