import { Request } from "express";
import { errorHandler, withTransaction } from "../utils";

export const register = errorHandler(
  withTransaction(async (req: Request, res: Response) => {
    const data = {
      name: req.body.username,
    };
    return {
      data,
    };
  })
);
