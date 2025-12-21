"use server"
import connectDB from "@/lib/dbConnect"
import User from "@/models/User"
import { signUpSchema } from "@/schema/userSchma";
import bcrypt from "bcryptjs";
import z, { ZodError } from "zod";

type UserInput = z.infer<typeof signUpSchema>;

export async function registerUser(formData: UserInput) {
    try {
        await connectDB();
        const data = signUpSchema.parse(formData);
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) return { success: false, message: "This email already exists" };

        const hashedPassword = await bcrypt.hash(data.password, 10);
        await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            photo: data.photo,
            phone: data.phone,
            address: data.address,
            role: "user",
        });
        return { success: true, message: "Successfully registered user" };
    } catch (error) {
        console.error("Error while registering user in DB:", error);
        if (error instanceof ZodError) return { success: false, message: "Invalid input data" };
        return { success: false, message: "Something went wrong" };
    }
}