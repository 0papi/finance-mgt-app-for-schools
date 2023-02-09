import { errorHandler, withTransaction } from "../utils";
import { Request, Response } from "express";
import { ClientSession } from "mongoose";

const login = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {}
  )
);

export default login;
