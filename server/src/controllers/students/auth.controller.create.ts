import { ClientSession } from "mongoose";
import { Response } from "express";
import { errorHandler, withTransaction } from "../../utils";
import {HttpError} from "../../errors/httpError";
import {ErrorCodes} from "../../errors/errorCodes";
import {Student} from "../../database/models/Student";
import {RequestWithInstitutionId} from "../../middlewares/authMiddleware";


const createStudent = errorHandler(
  withTransaction(
    async (req: RequestWithInstitutionId, res: Response, session: ClientSession) => {
        const institutionId = req.institutionId
        const {firstName, lastName, otherName, studentClass, location } = req.body
        if(!firstName || !lastName || !studentClass || !location){
            throw new HttpError(ErrorCodes.BadRequest, 'Please ensure that all required fields are provided')
        }

        const studentDoc = await Student.create({
            firstName,
            lastName,
            otherName,
            studentClass,
            location,
            institution: institutionId
        })

        await studentDoc.save({session})

      return {
            id: studentDoc._id,
            firstName:studentDoc.firstName,
            lastName:studentDoc.lastName,
            otherName:studentDoc.otherName,
            studentClass: studentDoc.studentClass,
            location:studentDoc.location
        };
    }
  )
);

export default createStudent;
