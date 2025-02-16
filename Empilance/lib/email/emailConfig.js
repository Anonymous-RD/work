import nodemailer from "nodemailer";

// Create the SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // SMTP username
    pass: process.env.SMTP_PASSWORD, // SMTP password
  },
});

// Function to send email when user created.
const sendUserCreatedEmail = async (to, firstName, username, password) => {
  try {
    const subject = "Welcome to Our Platform";
    const text =
      `Hello ${firstName},\n\n` +
      `Welcome to our platform! We're excited to have you on board.\n\n` +
      `Here are your login details:\n` +
      `Username: ${username}\n` +
      `Password: ${password}\n\n` +
      `You can log in to your account using these credentials at any time.\n\n` +
      `If you have any questions, feel free to reach out to our support team.`;

    const html =
      `<p>Hello ${firstName},</p>` +
      `<p>Welcome to our platform! We're excited to have you on board.</p>` +
      `<p>Here are your login details:</p>` +
      `<p><strong>Username:</strong> ${username}</p>` +
      `<p><strong>Password:</strong> ${password}</p>` +
      `<p>You can log in to your account using these credentials at any time.</p>` +
      `<p>If you have any questions, feel free to reach out to our support team.</p>`;
    const mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to, // recipient address
      subject, // Subject line
      text, // plain text body
      html, // HTML body (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
// Function to Resend email
const reSendUserCreatedEmail = async (to, firstName, username) => {
  try {
    const subject = "Your Login Credentials"; 
    const text =
      `Hello ${firstName},\n\n` +
      `We noticed you might need your login details again. No worries, here is your username:\n\n` +
      `Username: ${username}\n\n` +
      `If you have forgotten your password, please reset it using the 'Forgot Password' link on the login page.\n\n` +
      `If you have any questions or require further assistance, feel free to contact our support team.\n\n` +
      `Best regards,\nThe Team`;

    const html =
      `<p>Hello ${firstName},</p>` +
      `<p>We noticed you might need your login details again. No worries, here is your username:</p>` +
      `<p><strong>Username:</strong> ${username}</p>` +
      `<p>If you have forgotten your password, please reset it using the 'Forgot Password' link on the login page.</p>` +
      `<p>If you have any questions or require further assistance, feel free to contact our support team.</p>` +
      `<p>Best regards,<br>The Team</p>`;
    const mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to, // recipient address
      subject, // Subject line
      text, // plain text body
      html, // HTML body (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendUserCreatedEmail, reSendUserCreatedEmail };
