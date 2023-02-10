import argon2 from "argon2";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../database/models/refreshToken";
import { Types } from "mongoose";

interface JWTPayload {
  institutionId: Types.ObjectId;
  tokenId: Types.ObjectId;
}

export function withTransaction(fn) {
  return async function (req: Request, res: Response, next: NextFunction) {
    let result;
    await mongoose.connection.transaction(async (session) => {
      result = await fn(req, res, session);
      return result;
    });

    return result;
  };
}

export function errorHandler(fn) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      let nextCalled = false;
      const result = await fn(req, res, (params) => {
        nextCalled = true;
        next(params);
      });
      if (!res.headersSent && !nextCalled) {
        res.json(result);
      }
    } catch (e) {
      next(e);
    }
  };
}

export const verifyPassword = async (
  hashedPassword: string,
  rawPassword: string
) => {
  if (await argon2.verify(hashedPassword, rawPassword)) {
    // password matches
  } else {
    throw new HttpError(401, "Wrong username or password");
  }
};

export const validateRefreshToken = async (token: string) => {
  const decodeToken = () => {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JWTPayload;
    } catch (err) {
      // err
      throw new HttpError(401, "Unauthorised");
    }
  };

  const decodedToken = decodeToken();
  const tokenExists = await RefreshToken.exists({
    _id: decodedToken?.tokenId,
    owner: decodedToken.institutionId,
  });
  if (tokenExists) {
    return decodedToken;
  } else {
    throw new HttpError(401, "Unauthorised");
  }
};
