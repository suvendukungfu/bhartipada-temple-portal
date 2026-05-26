import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json();

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RZP_KEY_SECRET || '')
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Store in DB logic here (Supabase)
      return NextResponse.json({ status: 'ok', message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ status: 'error', message: 'Signature mismatch' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
