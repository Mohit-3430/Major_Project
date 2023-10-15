import { Request, Response } from "express";
import { db } from "../../utils/db";
import bcrypt from "bcrypt";

export const check = (req: Request, res: Response) => {
  res.json({ msg: "From auth route" });
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(201).json({ status: false, msg: "User not found" });
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    res.status(200).json({ status: true, msg: "Login Successful" });
  } else {
    res.status(401).json({ status: false, msg: "wrong password!" });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  const { email, user_name, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const data = {
        email: email,
        user_name: user_name,
        password: hashedPassword,
      };
      const user = await db.user.create({
        data: data,
      });

      res.json({ status: true, msg: "In process", user: user });
    } catch (exp) {
      console.log(exp);
      res.json({ status: false, msg: "In process" });
    }
  } else {
    res.json({ status: false, msg: "email already taken!" });
  }
};
