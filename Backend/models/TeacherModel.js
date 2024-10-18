import { Schema } from "mongoose";
import mongoose from "mongoose";

const TeacherSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, default: 'faculty' },
  phno:{type:Number},
  token: {type:String}
});

const Teacher=mongoose.model("Teacher",TeacherSchema);
export {Teacher};