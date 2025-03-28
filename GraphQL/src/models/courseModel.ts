import mongoose, { Schema,Document } from "mongoose";

interface  CourseType extends Document {
  title: string;
  description: string;
  thumbnail: string;
  instructor: mongoose.Types.ObjectId;
}

const courseSchema = new Schema<CourseType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

 const Course = mongoose.model<CourseType>("Course", courseSchema);
 export {Course}

export {CourseType}
