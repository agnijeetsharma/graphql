import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";

interface Usertype extends Document {
  _id: Types.ObjectId; 
  email: string;
  password: string;
  name: string;
  role: string;
  // courses: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<Usertype>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:false
  },
  // courses:[
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Course",
  //   },
  // ]
});

export const User =mongoose.model<Usertype>("User", userSchema);
export default Usertype
