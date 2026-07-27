import { Request, Response, NextFunction } from 'express';

/**
 * Admin Authentication Middleware
 * Hardcoded credentials: admin/admin
 */
export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized - No credentials provided' });
    }

    // Expected format: "Basic base64(username:password)"
    const [authType, credentials] = authHeader.split(' ');

    if (authType !== 'Basic' || !credentials) {
        return res.status(401).json({ error: 'Unauthorized - Invalid format' });
    }

    // Decode base64 credentials
    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');

    // Credentials check: accepts your requested username & password OR custom environment variables
    const validUsername = username === (process.env.ADMIN_USERNAME || 'prawinjayakhar') || username === 'prawinjayakhar';
    const validPassword = password === (process.env.ADMIN_SECRET || 'Prawi@0509') || password === 'Prawi@0509';

    if (validUsername && validPassword) {
        next(); // Authentication successful
    } else {
        return res.status(403).json({ error: 'Forbidden - Invalid credentials' });
    }
};
