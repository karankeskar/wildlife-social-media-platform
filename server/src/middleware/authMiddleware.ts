import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { IUser, User } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
interface JwtPayload {
  id: String;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          res.status(500);
          throw new Error("JWT_SECRET not defined");
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = (await User.findById(decoded.id).select(
          "-password"
        )) as IUser;
        next();
      } catch (error) {
        console.error("Auth Error", error);
        res.status(401);
        throw new Error("Not Authorized token failed");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
