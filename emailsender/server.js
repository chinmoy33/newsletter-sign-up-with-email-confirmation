//const nodemailer = require('nodemailer');

import express from 'express'; // Importing express
import nodemailer from 'nodemailer'; // Importing nodemailer
import cors from 'cors'; // Importing cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use CORS middleware
app.use(cors()); // Allow all origins by default

// Create a transporter for the email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chinmoysharma2003@gmail.com',
    pass: 'zsju inzy aath cimq' // Your email password or app-specific password
  }
});



// Email sending route
app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: 'chinmoysharma2003@gmail.com',
    to: to,
    subject: subject,
    text: message,
    //html: `<p>This is a confirmation email</p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      //return res.status(500).send('Error sending email: ' + err);
      return res.status(500).json({ error: 'Error sending email', details: err.message });
    }
    //res.status(200).send('Email sent successfully: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully', response: info.response });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




