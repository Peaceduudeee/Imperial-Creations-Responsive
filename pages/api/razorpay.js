// pages/api/razorpay.js
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { totalAmount } = req.body; // totalAmount should be a number (in paise)
    
    // Validate totalAmount
    if (!totalAmount || typeof totalAmount !== "number") {
      return res.status(400).json({ error: "Invalid total amount" });
    }
    
    try {
      const options = {
        amount: totalAmount, // amount in paise
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        payment_capture: 1, // Auto-capture payment
      };
      const order = await razorpay.orders.create(options);
      return res.status(200).json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
}