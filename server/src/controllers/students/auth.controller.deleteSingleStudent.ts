import {Response} from "express";
import {ClientSession} from "mongoose";

import {RequestWithInstitutionId} from "../../middlewares/authMiddleware";
import {Student} from "../../database/models/Student";
import {errorHandler, withTransaction} from "../../utils";
import {HttpError} from "../../errors/httpError";
import {ErrorCodes} from "../../errors/errorCodes";


const deleteSingleStudent = errorHandler(
    withTransaction(
        async (req: RequestWithInstitutionId, res: Response, session: ClientSession) => {

            const institutionId = req.institutionId;

            const { id } = req.params;


            if(!id || !institutionId){
                throw new HttpError(ErrorCodes.Unauthorized, 'Not authorized')
            }

            const deletedStudent = await Student.findOneAndDelete(
                { _id: id, institution: institutionId }).exec();
            if (!deletedStudent) {
                throw new HttpError(ErrorCodes.NotFound, "Student not found");
            }

            return deletedStudent;
        }
    )
);

export default deleteSingleStudent;
