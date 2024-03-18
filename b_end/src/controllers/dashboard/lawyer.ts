import { Request, Response } from "express";
import { db } from "../../utils/db";

export const FetchLawyers = async (req: Request, res: Response) => {
  const data = await db.user.findMany({
    where: {
      usertype: "Lawyer",
    },
    select: {
      email: true,
      name: true,
    },
  });

  if (data) {
    res.status(200).json({ success: true, data: data });
  } else res.status(204).json({ success: false, msg: "Error" });
};
