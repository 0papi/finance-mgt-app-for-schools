import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/httpError";
import { errorHandler } from "../utils";
import { ErrorCodes } from "../errors/errorCodes";

interface RequestWithInstitutionId extends Request {
  institutionId: string;
}

const verifyAccessToken = errorHandler(
  async (req: RequestWithInstitutionId, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new HttpError(ErrorCodes.Unauthorized, "Unauthorized");
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;
      req.institutionId = decodedToken.institutionId;
      next();
    } catch (e) {
      throw new HttpError(401, "Unauthorized");
    }
  }
);

export default verifyAccessToken;
