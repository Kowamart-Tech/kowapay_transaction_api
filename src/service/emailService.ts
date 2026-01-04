import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const APP_NAME = "KOWAPAY";

/**
 * Environment validation (recommended)
 */
const {
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = process.env;

if (!EMAIL_SERVICE || !EMAIL_USER || !EMAIL_PASSWORD) {
  throw new Error("Missing email environment variables");
}

/**
 * Nodemailer transporter
 */
const transporter: Transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});


/**
 * Verify transporter
 */
transporter.verify((err, success) => {
  if (err) {
    console.error("Mailing failed to verify.", err);
  } else {
    console.log("Mailing verified", success);
  }
});

/**
 * Central email sender
 */
const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  await transporter.sendMail({
    from: `"${APP_NAME}" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

/**
 * Capitalize full name
 */
const capitalizeEachWord = (text: string): string =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());

/**
 * Send OTP email
 */
export const sendOtpEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const subject = "Verify Your Email";

  const html = `
  <!-- OTP EMAIL TEMPLATE -->
  <h2>${APP_NAME} Verification</h2>
  <p>Your OTP code:</p>
  <h1>${otp}</h1>
  <p>This code expires in 15 minutes.</p>
  `;

  await sendEmail(email, subject, html);
};

/**
 * Send Forgot Password OTP
 */
export const sendForgotPasswordEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const subject = "Reset Your Password";

  const html = `
  <h2>Password Reset</h2>
  <p>Use the OTP below to reset your password:</p>
  <h1>${otp}</h1>
  `;

  await sendEmail(email, subject, html);
};

/**
 * Send Login Notification
 */
export const sendLoginNotificationEmail = async (
  email: string,
  fullName?: string
): Promise<void> => {
  const subject = "New Login Detected";
  const loginTime = new Date().toLocaleString();

  const html = `
  <h2>Login Alert</h2>
  <p>Hello ${fullName ? capitalizeEachWord(fullName) : "User"},</p>
  <p>A new login was detected on your ${APP_NAME} account.</p>
  <p><strong>Time:</strong> ${loginTime}</p>
  `;

  await sendEmail(email, subject, html);
};


/**
 * Send Transaction Notification Email
 */
export const sendTransactionNotificationEmail = async (
  email: string,
  data: {
    fullName?: string;
    amount: number;
    currency: string;
    transactionType: string;
    reference: string;
    status: "SUCCESS" | "PENDING" | "FAILED";
    createdAt?: Date;
  }
): Promise<void> => {
  const {
    fullName,
    amount,
    currency,
    transactionType,
    reference,
    status,
    createdAt,
  } = data;

  const subject = "Transaction Notification";
  const txTime = (createdAt ?? new Date()).toLocaleString();

  const html = `
    <h2>${transactionType} Alert!</h2>

    <p>Hello ${
      fullName ? capitalizeEachWord(fullName) : "User"
    },</p>

    <p>A transaction has occurred on your <strong>${APP_NAME}</strong> account.</p>

    <table style="border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td><strong>Type:</strong></td>
        <td>${transactionType}</td>
      </tr>
      <tr>
        <td><strong>Amount:</strong></td>
        <td>${currency} ${amount.toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>Status:</strong></td>
        <td>${status}</td>
      </tr>
      <tr>
        <td><strong>Reference:</strong></td>
        <td>${reference}</td>
      </tr>
      <tr>
        <td><strong>Date:</strong></td>
        <td>${txTime}</td>
      </tr>
    </table>

    <p style="margin-top: 15px;">
      If you did not initiate this transaction, please contact our support team immediately.
    </p>

    <p>
      Thank you for using <strong>${APP_NAME}</strong>.
    </p>
  `;

  await sendEmail(email, subject, html);
};


/**
 * Send Reset URL Email
 */
export const sendResetOTP = async (
  email: string,
  resetUrl: string
): Promise<void> => {
  const subject = "Reset Your Password";

  const html = `
  <h2>Reset Your Password</h2>
  <p>Click the link below to reset your password:</p>
  <a href="${resetUrl}">${resetUrl}</a>
  <p>This link expires in 1 hour.</p>
  `;

  await sendEmail(email, subject, html);
};


