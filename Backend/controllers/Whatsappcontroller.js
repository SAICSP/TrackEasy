import express from 'express'
const router = express.Router();
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID; // From Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN;   // From Twilio
const client = new twilio(accountSid, authToken);

const sendwhatsapp= async (req, res) => {
  try {
    const { teacherPhone, subject, section, presenteesCount, absenteesCount, absenteesRollNumbers } = req.body;

    const today = new Date().toLocaleDateString(); 
    const absenteesList = absenteesRollNumbers.join(', ');

    const messageBody = `
      Attendance Report:
      Subject: ${subject}
      Section: ${section}
      Date: ${today}
      Presentees: ${presenteesCount}
      Absentees: ${absenteesCount}
      Absentees Roll Numbers: ${absenteesList}
    `;

    const message = await client.messages.create({
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: `whatsapp:+91${teacherPhone}`, // Teacher's phone number
      body: messageBody
    });

    res.status(200).json({ success: true, message: 'WhatsApp message sent successfully!' });
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    res.status(500).json({ success: false, message: 'Failed to send WhatsApp message' });
  }
};

export {sendwhatsapp};
