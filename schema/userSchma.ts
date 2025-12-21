import { z } from "zod";

export const passwordSchema = z.string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    "Password must contain uppercase, lowercase, number and be at least 8 characters"
  );

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: passwordSchema,
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema.extend({
  name: z.string()
    .min(1, "Name is required")
    .max(30, "Name can contain only 30 characters"),

  photo: z.string().min(1, "Photo is required"),

  phone: z.string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(11, "Phone number must be at most 11 digits"),

  address: z.string()
    .min(1, "Address is required")
    .max(100, "Address can contain only 100 characters"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const serviceProviderSchema = z.object({
  skills: z.string()
    .min(1, "Skills is required")
    .max(30, "Skills can contain only 30 characters")
    .default("Other"),

  bio: z.string().min(1, "Bio is required").max(800, "800 character limit cross"),

  nid: z.string()
    .min(1, "NID number is required")
    .min(7, "NID number must be at least 7 digits")
    .max(12, "NID number must be at most 12 digits"),

  division: z.string().min(1, "Address is required"),

  city: z.string().min(1, "Address is required"),
});

export type ServiceProviderInput = z.infer<typeof serviceProviderSchema>;