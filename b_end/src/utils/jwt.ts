import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { db } from "./db";
import dotenv from "dotenv";
dotenv.config();

export const issueJWT = async (id: string) => {
  const user = await db.user.findUnique({ where: { id: id } });

  const payload = {
    sub: id,
  };
  const secret: any = process.env.JWT_SECRET;

  const options = {
    expiresIn: process.env.JWT_EXP,
  };
  const token = jwt.sign(payload, secret, options);
  return {
    token: token,
    expires: process.env.JWT_EXP,
  };
};
