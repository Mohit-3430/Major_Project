import jwt from "jsonwebtoken";

import { Response, NextFunction, RequestHandler } from "express";
import { db } from "../utils/db";
import dotenv from "dotenv";
dotenv.config();

import { UserExpressRequest } from "../types";

export const authMiddleware: any = (
  req: UserExpressRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret: any = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, async (err: any, payload: any) => {
      if (err) return res.sendStatus(403);
      else {
        const user = await db.user.findUnique({
          where: {
            id: payload.sub,
          },
        });
        if (!user) res.send(false);
        else req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).send(false);
  }
};
