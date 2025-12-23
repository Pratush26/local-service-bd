import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import connectDB from "./lib/dbConnect"
import User from "./models/User"
import { signInSchema } from "./schema/userSchma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      console.log(credentials)
      await connectDB();
      const { email, password } = await signInSchema.parseAsync(credentials);
      const user = await User.findOne({ email });
      if (!user) throw new Error("No user found");

      const isPasswordValid = await bcrypt.compare(password, user?.password);
      if (!isPasswordValid) throw new Error("Invalid password");

      return {
        name: user.name,
        email: user.email,
        role: user.role as  "employee" | "seller" | "customer" | "admin",
        image: user.photo,
      };
    }
  })],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectDB();
        const dbUser = await User.findOne({ email: profile?.email });
        if (!dbUser) return "/register";
        user.email = dbUser.email;
        user.name = dbUser.name;
        user.role = dbUser.role as "employee" | "seller" | "customer" | "admin";
        user.image = dbUser.photo;
        return true;
      }
      return true; // allow credentials login
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role ?? "customer";
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as "employee" | "seller" | "customer" | "admin";
      session.user.image = token.image as string;
      return session;
    },
  },
})