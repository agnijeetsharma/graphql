import { Course } from "../models/courseModel";
export const getAllCourses = async () => {
    try {
        const courses = await Course.find();
        return courses;
    }
    catch (error) {
        console.log(error);
    }
};
export const getCourseById = async (parent, args, context, info) => {
    try {
        const course = await Course.findById(args.id);
        if (!course) {
            throw new Error("Course not found");
        }
        return course;
    }
    catch (error) {
        console.error("Error fetching course:", error);
        throw new Error("Failed to fetch course");
    }
};
export const getUserCourses = async (user) => {
    try {
        const courses = await Course.find({ instructor: user._id });
        return courses;
    }
    catch (error) {
        throw new Error("Failed to fetch course");
    }
};
