import { errorHandler, withTransaction } from "../utils";
import { Request, Response } from "express";

const logout = errorHandler(
  withTransaction(async (req: Request, res: Response) => {
    const data = {
      name: req.body.username,
    };
    return {
      data,
    };
  })
);

export default logout;
