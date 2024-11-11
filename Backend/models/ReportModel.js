import { Schema } from "mongoose";
import { mongoose } from "mongoose";
// Create a schema for attendance
const attendanceSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    presentees: {
        type: Number,
        required: true
    },
    absentees: {
        type: Number,
        required: true
    },
    absenteeRollNumbers: {
        type: [String], 
        required: true
    }
});

const Report = mongoose.model('Report', attendanceSchema);

export{ Report};
