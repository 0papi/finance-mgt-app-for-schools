import { Schema, Types, model } from "mongoose";

const TOKEN_NAME = "Token";

const TokenSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  token: {
    type: Schema.Types.String,
    required: true,
  },
});

export const TokenModel = model(TOKEN_NAME, TokenSchema);
