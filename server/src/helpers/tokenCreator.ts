import jwt from "jsonwebtoken";
import { Schema, Types } from "mongoose";

export const createAccessToken = (userId: Types.ObjectId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "10m",
  });
};

export function createRefreshToken(
  userId: Types.ObjectId,
  refreshTokenId: Types.ObjectId
) {
  return jwt.sign(
    {
      userId: userId,
      tokenId: refreshTokenId,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "30d",
    }
  );
}
