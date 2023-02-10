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
      // throw error if institutionnumber & password are not provided in request body
      if (!req.body.institutionNumber || !req.body.password) {
        throw new HttpError(
          ErrorCodes.BadRequest,
          "Institution number and password are required"
        );
      }
      // get insttitution instance for the user with password included in payload
      const institutionDoc = await Institution.findOne({
        institutionNumber: req.body.institutionNumber,
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
      await verifyPassword(institutionDoc.password, req.body.password);

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

// const login = errorHandler(withTransaction(async (req, res, session) => {
//   const userDoc = await models.User
//       .findOne({username: req.body.username})
//       .select('+password')
//       .exec();
//   if (!userDoc) {
//       throw new HttpError(401, 'Wrong username or password');
//   }
//   await verifyPassword(userDoc.password, req.body.password);

//   const refreshTokenDoc = models.RefreshToken({
//       owner: userDoc.id
//   });

//   await refreshTokenDoc.save({session});

//   const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);
//   const accessToken = createAccessToken(userDoc.id);

//   return {
//       id: userDoc.id,
//       accessToken,
//       refreshToken
//   };
// }));
