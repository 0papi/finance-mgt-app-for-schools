import {Response} from "express";
import {ClientSession} from "mongoose";

import {RequestWithInstitutionId} from "../../middlewares/authMiddleware";
import {Student} from "../../database/models/Student";
import {errorHandler, withTransaction} from "../../utils";
import {HttpError} from "../../errors/httpError";
import {ErrorCodes} from "../../errors/errorCodes";
import {validateStudentUpdate} from "../../helpers/validateReq";

const updateSingleStudent = errorHandler(
    withTransaction(
        async (req: RequestWithInstitutionId, res: Response, session: ClientSession) => {

            const institutionId = req.institutionId;

            const { id } = req.params;


            if(!id || !institutionId){
                throw new HttpError(ErrorCodes.Unauthorized, 'Not authorized')
            }

            const updates = req.body;


            const updatedStudent = await Student.findOneAndUpdate(
                { _id: id, institution: institutionId },
                updates,
                { new: true }
            ).exec();
            if (!updatedStudent) {
                throw new HttpError(ErrorCodes.NotFound, "Student not found");
            }

            return updatedStudent;
        }
    )
);

export default updateSingleStudent;
