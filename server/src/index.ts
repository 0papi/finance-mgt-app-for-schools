import express, { Request, Response } from "express";
import { config } from "./config/secret";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Finance Management System");
});

app.listen(config.PORT, () =>
  console.log(`Server started on PORT: ${config.PORT}`)
);
