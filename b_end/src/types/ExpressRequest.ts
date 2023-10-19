import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface UserExpressRequest extends Request {
  user: string | JwtPayload;
}
