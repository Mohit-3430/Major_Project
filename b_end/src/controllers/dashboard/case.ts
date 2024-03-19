import { Request, Response } from "express";
import { db } from "../../utils/db";

export const CreateCase = async (req: Request, res: Response) => {
  const { lawyerMail, clientMail } = req.body;

  try {
    const checkCase = await db.case.findFirst({
      where: {
        lawyerMail: lawyerMail,
        clientMail: clientMail,
      },
    });
    if (!checkCase) {
      const data = {
        lawyerMail: lawyerMail,
        clientMail: clientMail,
        transactionAmount: 100,
      };

      try {
        await db.case.create({
          data: data,
        });
        res.status(201).json({ success: true, msg: "Case Created!" });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, msg: "Couldn't register" });
      }
    } else res.status(409).json({ success: false, msg: "Already consulted!" });
  } catch (err) {
    res.status(400).json({ success: false, msg: "Couldn't consult!" });
  }
};
