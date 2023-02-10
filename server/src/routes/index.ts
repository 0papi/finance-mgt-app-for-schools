import express from "express";
import router from "./auth";
import studentsRouter from "./students";

const routes = express.Router();

routes.use("/auth", router);
routes.use("/students", studentsRouter);

export default routes;
