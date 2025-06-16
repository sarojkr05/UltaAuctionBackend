import crypto from "crypto";
import razorpayInstance from "../utils/razorpay.js";
import jwt from "jsonwebtoken"
export const createOrderController = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency,
      receipt,
    };
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error); 
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    // Generate a short-lived token
    const token = jwt.sign(
      { orderrId : razorpay_order_id, paymentId: razorpay_payment_id, userId: req.user?.id },
      process.env.JWT_SECRET,
      { expiresIn: "2m" } // Token valid for 2 mins
    );

    res.status(200).json({ success: true, message: "Payment verified", token });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
