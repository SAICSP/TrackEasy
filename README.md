# TrackEasy
TrackEasy is a web-based attendance management system built using the MERN stack (MongoDB, Express.js, React, Node.js). It streamlines the traditional attendance process by providing a digital, real-time solution for teachers and students. Teachers can mark attendance efficiently, generate summary reports, and share data seamlessly.



# Installation and Setup :
Prerequisites

Node.js
MongoDB Atlas (or local MongoDB setup)

# git clone https://github.com/SAICSP/TrackEasy.git

# Backend Setup
``cd Backend<br>
npm install <br>
npm start``

# Frontend Setup
``cd Frontend
npm install
npm run dev
``
# API Endpoints
POST /api/v1/teach/signin - Teacher Sign-In

POST /api/v1/teach/signup - Teacher Sign-Up

POST /api/v1/attendancemark - Mark Attendance

POST /api/v1/sendReport - Send Attendance Report via Email

GET /api/v1/student/:rollNumber - Get Student Attendance Data

# generate 16 digit app password to use nodemailer service
Google App Password is a 16-character pass key that allows less secure apps or devices to access your Google Account.

Prerequisites:
You must have 2-Step Verification enabled on your Google Account.

You must be logged into your Google account on your browser.

1.search app password in search bar
2.create a name for passkey
3.get passkey for there and use in env 

