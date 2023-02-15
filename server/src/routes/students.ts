import express from "express";
import {
  CreateStudent,
  DeleteSingleStudent,
  GetAllStudents,
  GetSingleStudent,
  UpdateSingleStudent,
  PayStudentFee,
} from "../controllers";
import verifyAccessToken from "../middlewares/authMiddleware";
import { validateStudentUpdate } from "../helpers/validateReq";
import validateFees from "../middlewares/feeValidator";
const studentsRouter = express.Router();

studentsRouter.post("/create", verifyAccessToken, CreateStudent);
studentsRouter.get("/all", verifyAccessToken, GetAllStudents);
studentsRouter.get("/all/:id", verifyAccessToken, GetSingleStudent);
studentsRouter.put(
  "/all/:id/update",
  verifyAccessToken,
  validateStudentUpdate,
  UpdateSingleStudent
);
studentsRouter.delete("/all/:id", verifyAccessToken, DeleteSingleStudent);
studentsRouter.post(
  "/all/:studentId/fee",
  verifyAccessToken,
  validateFees,
  PayStudentFee
);

export default studentsRouter;
