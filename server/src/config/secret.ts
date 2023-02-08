/**
 * @description this file contains all the configuration variables for the entire application
 * @fileName secrets.ts
 * @createdAt 2/2/2023
 * @author Evans Kojo Kwofie
 */

import dotEnv from "dotenv";

dotEnv.config();

export const config = {
  PORT: 5000,
  mongoConnectionString: process.env.MONGO_URI ?? "",
  nexmoKey: process.env.NEXMO_API_KEY ?? "",
  nexmoSecret: process.env.NEXMO_API_SECRET ?? "",
};
