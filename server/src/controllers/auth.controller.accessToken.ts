import { Request, Response } from "express";
import { createAccessToken } from "../helpers/tokenCreator";
import { errorHandler, validateRefreshToken } from "../utils";

const accessToken = errorHandler(async (req: Request, res: Response) => {
  const refreshToken = await validateRefreshToken(req.body.refreshToken);
  const accessToken = createAccessToken(refreshToken.institutionId);

  return {
    id: refreshToken.institutionId,
    accessToken,
    refreshToken: req.body.refreshToken,
  };
});

export default accessToken;
