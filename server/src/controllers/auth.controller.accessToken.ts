import { Request, Response } from "express";
import { errorHandler, withTransaction } from "../utils";

const accessToken = errorHandler(
  withTransaction(async (req: Request, res: Response) => {
    const data = {
      name: req.body.username,
    };
    return {
      data,
    };
  })
);

export default accessToken;
