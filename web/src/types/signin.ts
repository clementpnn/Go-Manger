import { z } from "zod";

export const login = z.object({
  email: z.string().email().min(1, { message: "Email cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const register = z
  .object({
    email: z
      .string()
      .email()
      .min(1, { message: "Email cannot be empty" })
      .max(255, { message: "Email cannot be longer than 255 characters" }),
    name: z.string().min(4, { message: "Username cannot be empty" }).max(255, { message: "Username cannot be longer than 255 characters" }),
    password: z
      .string()
      .min(8, { message: "Password cannot be empty" })
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
    password_confirmation: z.string().min(1, { message: "Password cannot be empty" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export const registerRestaurant = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email cannot be empty" })
    .max(255, { message: "Email cannot be longer than 255 characters" }),
  name: z.string().min(4, { message: "Username cannot be empty" }).max(255, { message: "Username cannot be longer than 255 characters" }),
  description: z
    .string()
    .min(4, { message: "Description cannot be empty" })
    .max(255, { message: "Description cannot be longer than 255 characters" }),
  image: z
    .instanceof(File, { message: "Must be a file" })
    .refine((file) => file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/webp", {
      message: "Invalid file type. Only PNG, JPEG, JPG or WEBP are allowed.",
    }),
});

export const registerClient = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email cannot be empty" })
    .max(255, { message: "Email cannot be longer than 255 characters" }),
  name: z.string().min(4, { message: "Username cannot be empty" }).max(255, { message: "Username cannot be longer than 255 characters" }),
  password: z
    .string()
    .min(8, { message: "Password cannot be empty" })
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
