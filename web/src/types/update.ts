import { z } from "zod";

export const UpdateAdminProfile = z.object({
  email: z
    .string()
    .email()
    .max(255, { message: "Email cannot be longer than 255 characters" }),
  name: z.string().min(4, { message: "Username cannot be empty" }).max(255, { message: "Username cannot be longer than 255 characters" }),
});

export const UpdateClientProfile = z
  .object({
    email: z
      .string()
      .email()
      .max(255, { message: "Email cannot be longer than 255 characters" }),
    name: z.string().min(4, { message: "Username cannot be empty" }).max(25, { message: "Username cannot be longer than 25 characters" }),
    password: z
      .string()
      .max(180, { message: "Password cannot be longer than 180 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
  })

export const UpdateRestaurantProfile = z.object({
  email: z
    .string()
    .email()
    .max(255, { message: "Email cannot be longer than 255 characters" }),
  name: z.string().min(4, { message: "Username cannot be empty" }).max(255, { message: "Username cannot be longer than 255 characters" }),
  password: z
    .string()
    .max(180, { message: "Password cannot be longer than 180 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  description: z
    .string()
    .max(255, { message: "Description cannot be longer than 255 characters" }),
  image: z
    .instanceof(File, { message: "Must be a file" })
    .refine((file) => file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/webp", {
      message: "Invalid file type. Only PNG, JPEG, JPG or WEBP are allowed.",
    }),
});
