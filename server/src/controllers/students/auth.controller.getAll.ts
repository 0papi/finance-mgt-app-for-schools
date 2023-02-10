import { ClientSession } from "mongoose";
import { Request, Response } from "express";
import { errorHandler, withTransaction } from "../../utils";

const getAllStudents = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      return { message: "Get all student recors here" };
    }
  )
);

export default getAllStudents;
