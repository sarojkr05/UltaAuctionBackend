import twilio from "twilio";
import serverConfig from "../config/serverConfig.js";
const client = new twilio(serverConfig.TWILIO_ACCOUNT_SID, serverConfig.TWILIO_AUTH_TOKEN);

const otpStore = new Map(); // Use Redis or DB in production

export const sendOtp = async (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore.set(mobile, otp);

  await client.messages.create({
    body: `Your OTP for UltaAuction is ${otp}`,
    from: serverConfig.TWILIO_PHONE_NUMBER,
    to: `+91${mobile}`
  });

  // Set expiration (optional)
  setTimeout(() => otpStore.delete(mobile), 5 * 60 * 1000); // 5 minutes
};

export const verifyOtp = (mobile, inputOtp) => {
  const savedOtp = otpStore.get(mobile);
  return savedOtp && savedOtp.toString() === inputOtp;
};
