// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  photo: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, default: "user", enum: ["employee","serviceProvider","user","admin"] },
}, { timestamps: true });

const User: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;