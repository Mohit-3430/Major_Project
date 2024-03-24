import { z } from "zod";

const specschema = z.object({
  label: z.string(),
  value: z.string(),
});

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Enter email" }).email(),
  name: z.string().min(3, { message: "Enter your Name" }).max(255),
  age: z.coerce
    .number({ required_error: "Age is required" })
    .gt(18, { message: "You are not eligible" })
    .max(150),
  usertype: z.enum(["Lawyer", "Client"], {
    required_error: "You need to select",
  }),
  specializations: z.array(specschema),
  consultancyCost: z.number(),
  password: z
    .string()
    .min(6, { message: "Enter password with 6 or more characters" })
    .max(100),
  confirmPassword: z
    .string({ required_error: "Retype password again" })
    .min(6, { message: "Enter password with 6 or more characters" }),
});
