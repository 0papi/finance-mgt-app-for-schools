import express from "express";
import {
  CreateStudent,
  GetAllStudents,
  GetSingleStudent,
} from "../controllers";
const studentsRouter = express.Router();

// const handleStudentRoute = () => {};

studentsRouter.post("/create", CreateStudent);
studentsRouter.get("/all", GetAllStudents);
studentsRouter.get("/all/:id", GetSingleStudent);

export default studentsRouter;
