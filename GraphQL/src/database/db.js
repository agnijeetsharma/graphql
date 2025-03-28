import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const server = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected", process.env.PORT);
        return server;
    }
    catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};
