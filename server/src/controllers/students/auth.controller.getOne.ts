import { ClientSession } from "mongoose";
import { Request, Response } from "express";
import { errorHandler, withTransaction } from "../../utils";

const getOneStudent = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      return { message: "Get one student recors here" };
    }
  )
);

export default getOneStudent;
