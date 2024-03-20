import { Request, Response } from "express";
import { db } from "../../utils/db";

export const LawyerDashboardData = async (req: Request, res: Response) => {
  const { lawyerMail } = req.body;
  try {
    const reqcases = await db.case.findMany({
      where: {
        lawyerMail: lawyerMail,
      },
    });

    const totalAmount = reqcases.reduce((accumulator, currentTransaction) => {
      return accumulator + currentTransaction.transactionAmount;
    }, 0);

    if (reqcases.length == 0)
      res.status(202).json({ success: true, msg: "No cases" });
    else
      res.status(200).json({
        success: true,
        cases: reqcases,
        clientsCount: reqcases.length,
        totalAmount: totalAmount,
      });
  } catch (exp) {
    res.status(400).json({ success: false, msg: "Not Active cases!" });
  }
};

export const GetClientInformation = async (req: Request, res: Response) => {
  const { clientMail } = req.body;
  try {
    const client = await db.user.findUnique({
      where: {
        email: clientMail,
      },
    });
    res.status(200).json({ success: true, client: client });
  } catch (err) {
    res.status(409).json({ success: false, msg: "No Client Found!" });
  }
};
