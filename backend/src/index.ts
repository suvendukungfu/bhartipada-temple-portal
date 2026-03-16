import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import rateLimit from 'express-rate-limit';

import donationRoutes from './routes/donations';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Rate limiter: 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);

// Basic db pool (Supabase Postgres)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bhartipada Temple API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
