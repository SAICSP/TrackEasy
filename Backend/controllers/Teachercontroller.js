import httpStatus from "http-status";
import { Teacher } from "../models/TeacherModel.js";
import crypto from "crypto";

// Teacher Signin using phone number
const signin = async (req, res) => {
    const { phno, name,email } = req.body;
    
    if (!phno || !name || !email) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Provide phone number and name" });
    }   

    try {
        // Find teacher by phone number
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Teacher not found" });
        }

        // Match the provided name with the name stored in the database
        if (name === teacher.name) {
            const token = crypto.randomBytes(20).toString("hex");
            teacher.token = token; 
            await teacher.save();
            return res.status(httpStatus.OK).json({ token });
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ` });
    }
};

// Teacher Signup (remains the same)
const signup = async (req, res) => {
    const { email, name, phno } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(httpStatus.CONFLICT).json({ message: "Teacher already exists" });
        }

        const newTeacher = new Teacher({ email, name, phno });
        await newTeacher.save();
        return res.status(httpStatus.CREATED).json({ message: "Teacher Registered Successfully" });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
    }
};

export { signin, signup };
