import { ErrorCodes } from "./../errors/errorCodes";
import { ClientSession } from "mongoose";
import { errorHandler, validateRefreshToken, withTransaction } from "../utils";
import { Request, Response } from "express";
import { RefreshToken } from "../database/models/refreshToken";
import { HttpError } from "../errors/httpError";

const logout = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      if (!req.body.refreshToken) {
        throw new HttpError(
          ErrorCodes.BadRequest,
          "Please provide refresh token"
        );
      }
      const refreshToken = await validateRefreshToken(req.body.refreshToken);
      await RefreshToken.deleteOne({ _id: refreshToken.tokenId }, { session });
      return { success: true };
    }
  )
);

export default logout;
