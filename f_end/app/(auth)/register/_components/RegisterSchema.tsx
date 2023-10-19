import { z } from "zod";

export const registerSchema = z.object({
  email: z.string({ required_error: "Enter Email!" }).email(),
  name: z
    .string({ required_error: "Enter Name" })
    .min(3, { message: "Your name should not be that short!" })
    .max(255),
  age: z.coerce
    .number({ required_error: "Age is required" })
    .min(18, { message: "You are not eligible" })
    .max(150),
  usertype: z.enum(["Lawyer", "Client"], {
    required_error: "You need to select",
  }),
  password: z.string().min(6).max(100),
  confirmPassword: z.string({ required_error: "Retype password again" }).min(6),
});
