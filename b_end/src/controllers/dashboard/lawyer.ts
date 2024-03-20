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

    console.log(reqcases);
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
