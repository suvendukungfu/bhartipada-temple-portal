import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RZP_KEY_ID || 'dummy_key',
      key_secret: process.env.RZP_KEY_SECRET || 'dummy_secret',
    });

    const { amount, currency = 'INR', receipt } = await req.json();

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

