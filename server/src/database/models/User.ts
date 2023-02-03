import { Schema, Types, model } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  password: string;
  accountType: string;
}
const schema = new Schema<IUser>({
  firstName: {
    type: Schema.Types.String,
  },
  lastName: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  accountType: {
    type: Schema.Types.String,
  },
  phoneNumber: {
    type: Schema.Types.Number,
    unique: true,
    required: true,
  },
});

export const UserModel = model<IUser>(DOCUMENT_NAME, schema);
