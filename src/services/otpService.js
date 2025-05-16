import { saveOtp, verifyOtp as verifyStoreOtp } from "../repositories/otpStore.js";
import client from "../utils/twilioClient.js";
export const sendOTP = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const message = `Your OTP is ${otp}. It is valid for 5 minutes.`;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log("OTP sent from Twilio:", process.env.TWILIO_PHONE_NUMBER);
    console.log("OTP sent to phone:", phone);

    saveOtp(phone, otp);
    return { message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
}

export const verifyOTP = (phone, otp) => {
  const isValid = verifyStoreOtp(phone, otp);
  if (!isValid) {
    throw new Error("Invalid or expired OTP");
  }

  return { message: "OTP verified successfully" };
};