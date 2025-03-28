import { User } from "../models/userModel.js";
import mongoose from "mongoose";
export const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        return user;
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
export const getUserById = async (args) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
            throw new Error("Invalid User ID format");
        }
        const user = await User.findById(new mongoose.Types.ObjectId(args.id));
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        console.error("Error fetching user:", error.message);
        throw new Error("Failed to fetch user");
    }
};
export const createUser = async (args) => {
    try {
        const newUser = await User.create(args);
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to create user");
    }
};
// const getCourseById
