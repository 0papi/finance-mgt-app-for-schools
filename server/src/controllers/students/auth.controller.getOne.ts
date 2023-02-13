import { ClientSession } from "mongoose";
import { Response } from "express";
import { errorHandler, withTransaction } from "../../utils";
import {RequestWithInstitutionId} from "../../middlewares/authMiddleware";
import {Student} from "../../database/models/Student";

const getOneStudent = errorHandler(
  withTransaction(
    async (req: RequestWithInstitutionId, res: Response, session: ClientSession) => {
        const institutionId = req.institutionId;
        const id = req.params.id;
        const student = await Student.findOne({ _id: id, institution:institutionId }).exec();
        return student;
    }
  )
);

export default getOneStudent;
