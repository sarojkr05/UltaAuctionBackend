const otpStore = new Map();

export const saveOtp = (phone, otp) => {
    otpStore.set(phone, {otp, createdAt: Date.now() + 5 * 60 * 1000}); // OTP valid for 5 minutes
};

export const verifyOtp = (phone, otp) => {
    const data = otpStore.get(phone);
    if (!data) {
        return false;
    }
    const isValid = data.otp === otp && Date.now() < data.createdAt;
    if (isValid) {
        otpStore.delete(phone); // OTP is valid, delete it
        return isValid;
    }       
}