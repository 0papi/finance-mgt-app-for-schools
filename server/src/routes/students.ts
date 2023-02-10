import express from "express";
import {
  CreateStudent,
  GetAllStudents,
  GetSingleStudent,
} from "../controllers";
import verifyAccessToken from "../middlewares/authMiddleware";
const studentsRouter = express.Router();

// const handleStudentRoute = () => {};

studentsRouter.post("/create", verifyAccessToken, CreateStudent);
studentsRouter.get("/all", verifyAccessToken, GetAllStudents);
studentsRouter.get("/all/:id", verifyAccessToken, GetSingleStudent);

export default studentsRouter;
