import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: [true, 'Roll number is required'],  
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
        token: String
});

const Student = mongoose.model('Student', studentSchema);

export { Student };
