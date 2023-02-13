import { ErrorCodes } from "./../errors/errorCodes";
import { Request, Response } from "express";
import { HttpError } from "../errors/httpError";
import { createAccessToken } from "../helpers/tokenCreator";
import { errorHandler, validateRefreshToken } from "../utils";

const accessToken = errorHandler(async (req: Request, res: Response) => {
  const refreshTokenFromUser = req.body.refreshToken;
  if (!refreshTokenFromUser) {
    throw new HttpError(ErrorCodes.BadRequest, "Please provide refresh token");
  }
  const refreshToken = await validateRefreshToken(refreshTokenFromUser);
  const accessToken = createAccessToken(refreshToken.institutionId);

  return {
    id: refreshToken.institutionId,
    accessToken,
    refreshToken: req.body.refreshToken,
  };
});

export default accessToken;
