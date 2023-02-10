import { ClientSession } from "mongoose";
import { Request, Response } from "express";
import { errorHandler, withTransaction } from "../../utils";

const createStudent = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      return { message: "Create student record here" };
    }
  )
);

export default createStudent;
