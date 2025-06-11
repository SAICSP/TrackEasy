import { Report } from "../models/ReportModel.js";

export const save = async (req, res) => {
  const { 
    teacherName,
    subject,
    branch,
    section,
    year,
    date,
    presentees,
    absentees,
    absenteeRollNumbers 
  } = req.body;

  // Add validation
  if (!teacherName || !subject || !branch || !section || !year || !date) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  try {
    const newReport = new Report({
      teacherName,
      subject,
      branch,
      section,
      year,
      date,
      presentees,
      absentees,
      absenteeRollNumbers
    });

    const savedReport = await newReport.save();
    res.status(201).json({
      message: "Report saved successfully",
      report: savedReport
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving report",
      error: error.message
    });
  }
};

export const getreports = async (req, res) => {
  try {
    const reportData = await Report.find();
    res.status(200).json(reportData);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: err.message });
  }
};
