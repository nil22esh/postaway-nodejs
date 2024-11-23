import nodemailer from "nodemailer";

// Create transporter instance
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.USER, // Email address (from .env)
    pass: process.env.APP_PASSWORD, // App password (from .env)
  },
});

// Function to send email
const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Middleware to send email
export const sendEmailMiddleware = async (req, res) => {
  try {
    const mailOptions = {
      from: {
        name: "PostAway 👻✅💁‍♂️",
        address: process.env.USER,
      },
      to: "nileshsury4940@gmail.com",
      subject:
        "We are sending this mail to from PostAway to get your OTP at time...✔",
      text: "Did you receive the PostAway OTP? 🆘😊",
      html: "<h1>We are from PostAway!</h1>",
    };

    const result = await sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
