import { Request, Response } from "express";

export const dashboard = (req: Request, res: Response) => {
  res.status(200).send("This is a protected Route!");
};
