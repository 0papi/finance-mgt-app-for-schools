import { Schema, model } from "mongoose";

const INSTUTITION_NUMBER_NAME = "InstitutionNumber";

const schema = new Schema({
  institutionNumber: String,
});

export const InstitutionNumber = model(INSTUTITION_NUMBER_NAME, schema);
