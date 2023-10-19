import { Request, Response } from "express";
import { UserExpressRequest } from "../../types";

export const dashboard = (req: Request, res: Response) => {
  console.log((req as UserExpressRequest).user);
  res.status(200).send("This is a protected Route!");
};
