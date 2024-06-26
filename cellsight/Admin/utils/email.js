const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a transporter
    console.log("EMAIL_USERNAME", process.env.EMAIL_USERNAME);
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message,
    }

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;