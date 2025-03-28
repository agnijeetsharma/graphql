import mongoose from "mongoose";

export const connectDB = async (): Promise<typeof mongoose | void> => {
    try {
        const server = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database connected",process.env.PORT);
        return server;
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); 
    }
};
