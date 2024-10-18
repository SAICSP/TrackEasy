import { Schema } from "mongoose";

const reportSchema = new Schema({
  subject: String,
  date: String,
  time: String,
  year: String,
  section: String,
  totalPresent: Number,
  totalAbsent: Number,
  records: [{ studentId: mongoose.Schema.Types.ObjectId, status: String }]
});

const Report=mongoose.model("Report",reportSchema);
export {Report};







