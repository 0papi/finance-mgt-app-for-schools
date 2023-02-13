import { verifyPassword } from "./../utils/index";
import { HttpError } from "./../errors/httpError";
import { Institution } from "./../database/models/Institution";
import { errorHandler, withTransaction } from "../utils";
import { Request, Response } from "express";
import { ClientSession } from "mongoose";
import { ErrorCodes } from "../errors/errorCodes";
import { RefreshToken } from "../database/models/refreshToken";
import { createAccessToken, createRefreshToken } from "../helpers/tokenCreator";

const login = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      const institutionNumber = req.body.institutionNumber;
      const password = req.body.password;
      // throw error if institutionnumber & password are not provided in request body
      if (!institutionNumber || !password) {
        throw new HttpError(
          ErrorCodes.BadRequest,
          "Institution number and password are required"
        );
      }
      // get insttitution instance for the user with password included in payload
      const institutionDoc = await Institution.findOne({
        institutionNumber: institutionNumber,
      })
        .select("+password")
        .exec();

      if (!institutionDoc) {
        throw new HttpError(
          ErrorCodes.BadRequest,
          "Wrong username or password"
        );
      }

      // verify entered password with password in store
      await verifyPassword(institutionDoc.password, password);

      // check if refresh token already exists with the instutition id
      // if it exists reset it otherwise create a new one with the institution id
      let refreshTokenDoc = await RefreshToken.findOne({
        owner: institutionDoc._id,
      });
      if (!refreshTokenDoc) {
        refreshTokenDoc = await RefreshToken.create({
          owner: institutionDoc._id,
        });
      } else {
        refreshTokenDoc.set({ owner: institutionDoc._id });
      }
      await refreshTokenDoc.save({ session });

      // generate refreshtokens and accesstokens
      const accessToken = createAccessToken(institutionDoc._id);
      const userRefreshToken = createRefreshToken(
        institutionDoc._id,
        refreshTokenDoc._id
      );

      // return information to user
      return {
        institutionId: institutionDoc._id,
        instutitionNumber: institutionDoc.institutionNumber,
        accessToken,
        refreshToken: userRefreshToken,
      };
    }
  )
);

export default login;
