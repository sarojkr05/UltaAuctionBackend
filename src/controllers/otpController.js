import { sendOtp, verifyOtp } from "../services/otpService.js";
import { findUser } from "../repositories/userRepository.js"; // ✅ import this

export const sendOTPController = async (req, res) => {
    const { phone, email } = req.body;

    if (!phone) {
        return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    try {
        // ✅ Step 1: Check if user already exists
        const existingUser = await findUser({
            $or: [
                { mobileNumber: phone },
                ...(email ? [{ email }] : []) // Optional: support email check
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this phone number or email already exists"
            });
        }

        // ✅ Step 2: Proceed to send OTP if user not found
        await sendOtp(phone);
        return res.status(200).json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.log("Send OTP error:", error);
        return res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
};


export const verifyOTPController = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
    }

    try {
        const isValid = await verifyOtp(phone, otp);
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