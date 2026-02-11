import { z } from "zod";

export const airtimeTransactionSchema = z.object({


  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code")
    .toUpperCase(), // e.g. NGN, USD

  phone_number: z
    .string()
    .regex(/^\d{10,15}$/, "Invalid phone number format"),

  network: z.enum(
    ["MTN", "AIRTEL", "GLO", "9MOBILE"],
    { errorMap: () => ({ message: "Invalid network" }) }
  ),
});
