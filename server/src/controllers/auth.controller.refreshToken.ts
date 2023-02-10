import { ClientSession } from "mongoose";
import { Request, Response } from "express";
import { RefreshToken } from "../database/models/refreshToken";
import { createAccessToken, createRefreshToken } from "../helpers/tokenCreator";
import { errorHandler, validateRefreshToken, withTransaction } from "../utils";
import { ErrorCodes } from "../errors/errorCodes";
import { HttpError } from "../errors/httpError";

const refreshToken = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      if (!req.body.refreshToken) {
        throw new HttpError(
          ErrorCodes.BadRequest,
          "Please provide refresh token"
        );
      }
      const currentRefreshToken = await validateRefreshToken(
        req.body.refreshToken
      );
      let refreshTokenDoc = await RefreshToken.findOne({
        owner: currentRefreshToken.institutionId,
      });
      if (!refreshTokenDoc) {
        refreshTokenDoc = await RefreshToken.create({
          owner: currentRefreshToken.institutionId,
        });
      }

      await refreshTokenDoc.save({ session });
      // await RefreshToken.deleteOne(
      //   { _id: currentRefreshToken.tokenId },
      //   { session }
      // );

      const refreshToken = createRefreshToken(
        currentRefreshToken.institutionId,
        refreshTokenDoc.id
      );
      const accessToken = createAccessToken(currentRefreshToken.institutionId);

      return {
        id: currentRefreshToken.institutionId,
        accessToken,
        refreshToken,
      };
    }
  )
);

export default refreshToken;
