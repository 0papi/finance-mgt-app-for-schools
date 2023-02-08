import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

type TFunc = (
  req: Request,
  res: Response,
  session: mongoose.ClientSession
) => Promise<any>;

export function withTransaction(fn: TFunc) {
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
