import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getAnalyticsObject = async (req: Request, res: Response) => {
  try {
    const totalDonationsResult = await pool.query(`SELECT SUM(amount) as total FROM donations WHERE status = 'successful'`);
    const countDonorsResult = await pool.query(`SELECT COUNT(DISTINCT email) as count FROM donations WHERE status = 'successful'`);
    
    // Simple mock of monthly stats grouping
    const monthlyStatsResult = await pool.query(`
      SELECT TO_CHAR(created_at, 'YYYY-MM') as month, SUM(amount) as total
      FROM donations 
      WHERE status = 'successful' 
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC 
      LIMIT 6
    `);

    // Fetch temple needs progress
    const needsResult = await pool.query(`SELECT * FROM needs ORDER BY created_at DESC`);
    
    // Fetch recent transactions
    const recentTx = await pool.query(`
      SELECT id, name, amount, created_at, payment_mode, status
      FROM donations 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    res.json({
      success: true,
      stats: {
        totalDonations: totalDonationsResult.rows[0].total || 0,
        totalDonors: countDonorsResult.rows[0].count || 0,
        monthly: monthlyStatsResult.rows,
      },
      needs: needsResult.rows,
      recentTransactions: recentTx.rows
    });
  } catch (error) {
    console.error("Admin Analytics error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
