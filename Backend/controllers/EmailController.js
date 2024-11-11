import nodemailer from 'nodemailer';

const sendAttendanceReport = async (req, res) => {
  const { teacherEmail, attendanceSummary } = req.body;

  // Debug log for request body
  console.log('Request Body:', req.body);

  // Check if attendanceSummary exists
  if (!attendanceSummary) {
    return res.status(400).json({ error: 'Attendance summary is missing in the request' });
  }

  // Destructure attendanceSummary
  const {
    teacherName,
    subject,
    branch,
    section,
    year,
    date,
    presentees,
    absentees,
    absenteeRollNumbers,
  } = attendanceSummary;

  

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailContent = `
    <h3>Attendance Report</h3>
    <p><strong>Teacher Name:</strong> ${teacherName || 'N/A'}</p>
    <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
    <p><strong>Branch:</strong> ${branch || 'N/A'}</p>
    <p><strong>Section:</strong> ${section || 'N/A'}</p>
    <p><strong>Year:</strong> ${year || 'N/A'}</p>
    <p><strong>Date:</strong> ${date || 'N/A'}</p>
    <p><strong>Presentees:</strong> ${presentees || 0}</p>
    <p><strong>Absentees:</strong> ${absentees || 0}</p>
    <p><strong>Absentees Roll Numbers:</strong> ${absenteeRollNumbers?.join(', ') || 'None'}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: teacherEmail,
    subject: 'Attendance Report',
    html: emailContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Attendance report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send attendance report' });
  }
};

export { sendAttendanceReport };
