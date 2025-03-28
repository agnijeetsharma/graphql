import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import Usertype from "../models/userModel.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};




export const getUserById = async (args: { id: string }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(args.id)) {
      throw new Error("Invalid User ID format");
    }

    const user = await User.findById(new mongoose.Types.ObjectId(args.id));

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error:any) {
    console.error("Error fetching user:", error.message);
    throw new Error("Failed to fetch user");
  }
};

// import { pubsub } from "../graphql/resolvers/resolvers.js";


export const createUser = async (args: { email: string; password: string; name: string; role: string }) => {
try {
  const newUser=await User.create(args);
  // console.log("Publishing USER_CREATED event..."); // Debugging log
  // pubsub.publish("USER_CREATED", { userCreated: newUser });
  return newUser;
} catch (error) {
  console.log(error);
  throw new Error("Failed to create user");
}
}
// const getCourseById
