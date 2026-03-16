import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request to include user
export interface AuthRequest extends Request {
  user?: any;
}

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Extract token from Authorization header usually populated by Supabase
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing auth token' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // In a real Supabase setup, you'd use supabase.auth.getUser(token)
    // or verify the JWT with Supabase's JWT secret
    const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || 'your_super_secret_jwt';
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    // For now, if role isn't embedded, we rely on the decoded payload 
    // Usually Supabase roles are handled via RLS, but for custom backends:
    if (decoded && decoded.role === 'admin' || decoded.user_metadata?.role === 'admin') {
      req.user = decoded;
      next();
    } else {
      // Mocking successful admin auth if secret matches and it's dev for now
      if(process.env.NODE_ENV !== 'production') {
        req.user = decoded;
        return next();
      }
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
