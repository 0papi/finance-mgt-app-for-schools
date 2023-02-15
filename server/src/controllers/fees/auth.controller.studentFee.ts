import { ClientSession } from "mongoose";
import { Response } from "express";
import { errorHandler, withTransaction } from "../../utils";
import { Fee } from "../../database/models/Fee";
import { HttpError } from "../../errors/httpError";
import { ErrorCodes } from "../../errors/errorCodes";
import { Student } from "../../database/models/Student";
import { RequestWithInstitutionId } from "../../middlewares/authMiddleware";

const payStudentFee = errorHandler(
  withTransaction(
    async (
      req: RequestWithInstitutionId,
      res: Response,
      session: ClientSession
    ) => {
      const institutionId = req.institutionId;
      const { studentId } = req.params;
      const { feeType, amount, datePaid } = req.body;

      const fee = await Fee.create({
        feeType,
        amount,
        datePaid,
        institution: institutionId,
        student: studentId,
      });

      await fee.save({ session });

      return {
        _id: fee._id,
        studentId: fee.student,
        institutionId: fee.institution,
        feeType: fee.feeType,
        amount: fee.amount,
        datePaid: fee.datePaid,
      };
    }
  )
);

export default payStudentFee;
