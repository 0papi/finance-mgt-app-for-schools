import express from "express";
import router from "./auth";

const routes = express.Router();

routes.use("/auth", router);

export default routes;
