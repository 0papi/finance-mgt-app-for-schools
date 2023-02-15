import { ErrorCodes } from "./../errors/errorCodes";
import { Request, Response, NextFunction } from "express";
import { IFee } from "../database/models/Fee";
import { HttpError } from "../errors/httpError";
import { RequestWithInstitutionId } from "./authMiddleware";

/**
 * @description Express middleware that validates the request payload for creating a new fee
 */
const validateFees = (req: Request, res: Response, next: NextFunction) => {
  const { studentId } = req.params;
  const { feeType, amount, datePaid } = req.body;

  if (!studentId || !feeType || !amount || !datePaid) {
    throw new HttpError(
      ErrorCodes.BadRequest,
      "Please ensure that all required fields are provided"
    );
  }

  next();
};

export default validateFees;
