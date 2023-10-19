import { Request, Response } from "express";
import { db } from "../../utils/db";
import bcrypt from "bcrypt";
import { issueJWT } from "../../utils/jwt";

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
    const { token } = await issueJWT(user.id);
    const data = {
      id: user.id,
      email: user.email,
      token: token,
    };
    res.status(200).json({ status: true, msg: "Login Successful", user: data });
  } else {
    res.status(401).json({ status: false, msg: "wrong password!" });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  const { email, name, password, age, usertype } = req.body;
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
        name: name,
        age: age,
        password: hashedPassword,
        usertype: usertype,
      };
      const user = await db.user.create({
        data: data,
      });

      res.status(201).json({ status: true, msg: "In process", user: user });
    } catch (exp) {
      res.status(401).json({ status: false, msg: "In process" });
    }
  } else {
    res.status(409).json({ status: false, msg: "email already taken!" });
  }
};
