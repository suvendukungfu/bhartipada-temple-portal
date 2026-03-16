import express from 'express';
import { createOrder, getPublicDonations, verifyPayment } from '../controllers/donationController';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/public', getPublicDonations);

export default router;
