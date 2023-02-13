import { ClientSession } from "mongoose";
import { Response } from "express";
import { errorHandler, withTransaction } from "../../utils";
import {Student} from "../../database/models/Student";
import {RequestWithInstitutionId} from "../../middlewares/authMiddleware";

const getAllStudents = errorHandler(
  withTransaction(
    async (req: RequestWithInstitutionId, res: Response, session: ClientSession) => {
        const institutionId = req.institutionId;
        const students = await Student.find({ institution: institutionId }).exec();
        return students;
    }
  )
);

export default getAllStudents;
