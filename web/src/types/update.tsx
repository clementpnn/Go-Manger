import { z } from "zod";

export const UpdateAdminProfile = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email cannot be empty" })
    .max(255, { message: "Email cannot be longer than 255 characters" }),
  name: z.string().min(4, { message: "Username cannot be empty" }).max(255, { message: "Username cannot be longer than 255 characters" }),
});
