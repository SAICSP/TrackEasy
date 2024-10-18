import httpStatus from "http-status";
import { Student } from "../models/StudentModel.js";
import crypto from "crypto";


const signin = async (req, res) => {
  const { rollNumber, name } = req.body;
  if (!rollNumber || !name) {
    console.log('Provide Credentials');
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Provide Credentials" });
  }
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      console.log('Student not found');
      return res.status(httpStatus.NOT_FOUND).json({ message: "Student not found" });
    }

    if (rollNumber === student.rollNumber && name === student.name) {
      const token = crypto.randomBytes(20).toString("hex");
      student.token = token;
      await student.save();
      return res.status(httpStatus.OK).json({ token });
    } else {
      console.log('Invalid credentials');
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    console.log(`Something went wrong: ${e.message}`);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong` });
  }
};



const signup = async (req, res) => {
  const { rollNumber, name } = req.body;
  try {
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(httpStatus.CONFLICT).json({ message: "Student already exists" });
    }
    const newStudent = new Student({ rollNumber, name });
    await newStudent.save();
    return res.status(httpStatus.CREATED).json({ message: "Student Registered Successfully" });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${e.message}` });
  }
};


const students = async (req, res) => {
  try {
    const studdata = await Student.find();
    res.status(httpStatus.OK).json(studdata);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};



export { signin, signup ,students};
