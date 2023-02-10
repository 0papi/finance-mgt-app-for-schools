import { Request } from "express";
import argon2 from "argon2";

import { ErrorCodes } from "../errors/errorCodes";
import { HttpError } from "../errors/httpError";
import { Institution } from "../database/models/Institution";
import UserIdGeneratorService from "../helpers/createInstitutionNumber";
import { errorHandler, withTransaction } from "../utils";
import { ClientSession } from "mongoose";
import { createAccessToken, createRefreshToken } from "../helpers/tokenCreator";
import { RefreshToken } from "../database/models/refreshToken";

const registerInstitution = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      const {
        name,
        email,
        location,
        phone,
        password,
        typeOfInstitution,
        phoneOfPersonRegistering,
        positionOfPersonRegistering,
        nameOfPersonRegistering,
      } = req.body;
      // check if institution is already registered
      const institutionExists = await Institution.findOne({ name });

      if (institutionExists) {
        throw new HttpError(
          ErrorCodes.Unauthorized,
          "Institution already exists"
        );
      }

      // check for required fields and throw error if not provided

      if (
        !name ||
        !email ||
        !phone ||
        !location ||
        !password ||
        !typeOfInstitution ||
        !nameOfPersonRegistering ||
        !phoneOfPersonRegistering ||
        !positionOfPersonRegistering
      ) {
        throw new HttpError(
          ErrorCodes.BadRequest,
          "Please provide required fields"
        );
      }

      // generate institution number
      const institutionNumber = await UserIdGeneratorService.generateId(name);

      // hash password using argon2

      // store institution data in database
      const institution = await Institution.create({
        name,
        email,
        location,
        phone,
        typeOfInstitution,
        phoneOfPersonRegistering,
        positionOfPersonRegistering,
        nameOfPersonRegistering,
        institutionNumber,
        password: await argon2.hash(password),
      });

      // create db instance of refresh token
      const refreshTokenDoc = await RefreshToken.create({
        owner: institution._id,
      });

      // save instutition
      await institution.save({ session });
      await refreshTokenDoc.save({ session });

      // generate refreshtokens and accesstokens
      const accessToken = createAccessToken(institution._id);
      const userRefreshToken = createRefreshToken(
        institution._id,
        refreshTokenDoc._id
      );

      // return information to user
      return {
        institutionId: institution._id,
        instutitionNumber: institution.institutionNumber,
        accessToken,
        refreshToken: userRefreshToken,
      };
    }
  )
);

export default registerInstitution;
