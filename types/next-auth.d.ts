import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name?: string;
    email?: string;
    image?: string;
    role?: "employee" | "seller" | "customer" | "admin";
  }

  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: "employee" | "seller" | "customer" | "admin";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    email?: string;
    image?: string;
    role?: "employee" | "seller" | "customer" | "admin";
  }
}