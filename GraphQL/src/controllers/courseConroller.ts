
import {Course} from "../models/courseModel";
import Usertype from "../models/userModel";

export const getAllCourses = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseById = async (parent: any, args: { id:string }, context: any, info: any) => {
    try {
      const course = await Course.findById(args.id);  
      if (!course) {
        throw new Error("Course not found");
      }
      return course;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw new Error("Failed to fetch course");
    }
  };


  
export const getUserCourses=async(user:Usertype)=>{
    try {
        const courses = await Course.find({instructor:user._id});
        return courses;
    } catch (error:any) {
        throw new Error("Failed to fetch course");
    }
}
  