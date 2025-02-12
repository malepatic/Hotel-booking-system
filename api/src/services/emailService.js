const nodemailer = require("nodemailer");

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: "tcharan241@gmail.com", 
    pass: "vqyh rkyx mhvz rqar", 
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"Your App Name" <your-email@gmail.com>',
      to,
      subject,
      text,
      html, 
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendEmail;
