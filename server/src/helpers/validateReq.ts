import { body, validationResult } from "express-validator";
import {NextFunction,Request, Response} from "express";
import {HttpError} from "../errors/httpError";
import {ErrorCodes} from "../errors/errorCodes";

export const validateStudentUpdate = [
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").not().isEmpty().withMessage("Last name is required"),
    body("studentClass").not().isEmpty().withMessage("Class is required"),
    body("location").not().isEmpty().withMessage("Location is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpError(ErrorCodes.BadRequest, 'Bad request. Required fields not provided')
        }
        next();
    },
];

