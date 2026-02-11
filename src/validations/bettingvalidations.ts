import { z } from "zod";

export const bettingSchema = z.object({


  betting_id: z
    .string()
    .min(3, "betting_id is required"),

  customer_name: z
    .string()
    .min(3, "Customer name must be at least 3 characters")
    .max(100, "Customer name is too long"),

  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code")
    .transform((val) => val.toUpperCase()),

  network: z.enum(
    ["SPORTYBET", "BET9JA", "1XBET", "BETKING", "NAIRABET"],
    {
      errorMap: () => ({ message: "Invalid betting network" }),
    }
  ),
});
