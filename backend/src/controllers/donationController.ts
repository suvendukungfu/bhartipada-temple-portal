import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, purpose, name, email, phone } = req.body;
    
    // Amount is in rupees, convert to paise
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      donationData 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Save full donation info to database
      const { name, email, phone, age, amount, purpose, message, is_anonymous } = donationData;
      
      const insertQuery = `
        INSERT INTO donations 
        (name, email, phone, age, amount, payment_mode, razorpay_order_id, razorpay_payment_id, status, purpose, message, is_anonymous)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;
      const values = [name, email, phone, age, amount, 'razorpay', razorpay_order_id, razorpay_payment_id, 'successful', purpose, message, is_anonymous || false];
      
      const result = await pool.query(insertQuery, values);
      
      return res.json({ success: true, message: "Payment verified successfully", data: result.rows[0] });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getPublicDonations = async (req: Request, res: Response) => {
  try {
    // Return only successful public donations limiting details
    const query = `
      SELECT id, name, amount, created_at, purpose, is_anonymous 
      FROM donations 
      WHERE status = 'successful' 
      ORDER BY created_at DESC 
      LIMIT 100
    `;
    const result = await pool.query(query);
    
    // Mask anonymous names
    const processedDonations = result.rows.map(d => ({
      ...d,
      name: d.is_anonymous ? 'A Devotee' : d.name
    }));

    res.json({ success: true, data: processedDonations });
  } catch (error) {
    console.error("Fetch donations error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
