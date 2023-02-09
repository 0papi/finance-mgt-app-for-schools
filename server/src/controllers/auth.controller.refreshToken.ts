import { Request, Response } from "express";
import { errorHandler, withTransaction } from "../utils";

const refreshToken = errorHandler(
  withTransaction(async (req: Request, res: Response) => {
    const data = {
      name: req.body.username,
    };
    return {
      data,
    };
  })
);

export default refreshToken;
