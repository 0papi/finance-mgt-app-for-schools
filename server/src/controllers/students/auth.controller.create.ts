import { ClientSession } from "mongoose";
import { Request, Response } from "express";
import { errorHandler, withTransaction } from "../../utils";

const createStudent = errorHandler(
  withTransaction(
    async (req: Request, res: Response, session: ClientSession) => {
      // --TODO:
      /**
       * check to make sure that all data required in the request body is present. For a student, check for their firstname, lastname, class, town, institution - retrieved from req.institutionId
       */
      return { message: "Create student record here" };
    }
  )
);

export default createStudent;
