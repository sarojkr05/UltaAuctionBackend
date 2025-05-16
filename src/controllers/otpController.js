import { sendOTP, verifyOTP } from "../services/otpService.js";

export const sendOTPController = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({success: false, message: "Phone number is required" });
    }
    
    try {
        await sendOTP(phone);
        return res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
}

export const verifyOTPController = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
    }

    try {
        const isValid = await verifyOTP(phone, otp);
        // Optional: mark user as verified in the database if OTP is valid
        if (isValid) {
            return res.status(200).json({ success: true, message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to verify OTP" });
    }
}