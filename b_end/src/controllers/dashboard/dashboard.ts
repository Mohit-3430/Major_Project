import { Request, Response } from "express";

export const dashboardTest = (req: Request, res: Response) => {
  res.status(200).send("This is a protected Route!");
};
