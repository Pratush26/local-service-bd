// lib/dbConnect.ts
import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export default async function connectDB(): Promise<void> {
  if (connection.isConnected) return;

  if (!process.env.DB) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

  try {
    const db = await mongoose.connect(process.env.DB, {
      dbName: "local-serviceBD",
    });
    connection.isConnected = db.connections[0].readyState;
    
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Failed to connect to the database");
  }
}