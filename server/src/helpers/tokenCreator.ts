import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createAccessToken = (institutionId: Types.ObjectId) => {
  return jwt.sign({ institutionId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "10m",
  });
};

export function createRefreshToken(
  institutionId: Types.ObjectId,
  refreshTokenId: Types.ObjectId
) {
  return jwt.sign(
    {
      institutionId: institutionId,
      tokenId: refreshTokenId,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "30d",
    }
  );
}
