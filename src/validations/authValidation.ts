import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string({ message: "First name is required" }),
  phoneNumber: z.string({ message: "Phone number is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password must be at least 6 characters long" })
    .min(6),
});

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ message: "Password must be at least 6 characters long" })
    .min(6),
});