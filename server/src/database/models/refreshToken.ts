import { Schema, Types, model } from "mongoose";

const TOKEN_NAME = "RefreshToken";

const TokenSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: "Institution",
    unique: true,
  },
});

export const RefreshToken = model(TOKEN_NAME, TokenSchema);
