import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain uppercase, lowercase, number and be at least 8 characters"
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(30, "Name can contain only 30 characters"),

  email: z.email("Invalid email address"),

  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain uppercase, lowercase, number and be at least 8 characters"
    ),

  photo: z.string().min(1, "Photo is required"),

  phone: z.string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(11, "Phone number must be at most 11 digits"),

  address: z.string()
    .min(1, "Address is required")
    .max(100, "Address can contain only 100 characters"),
});

export type SingUpInput = z.infer<typeof signUpSchema>;
