import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log('Auth header:', authHeader); // Add this for debugging

        if (!authHeader) {
            return res.status(401).send({
                message: "No authorization header provided",
                success: false,
            });
        }

        const token = authHeader.split(' ')[1];
        
        console.log('Token:', token); // Add this for debugging

        if (!token) {
            return res.status(401).send({
                message: "No token provided",
                success: false,
            });
        }

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                console.log('JWT verification error:', err); // Add this for debugging
                return res.status(403).send({
                    message: "Invalid or expired token",
                    success: false,
                    error: err.message,
                });
            }
            
            console.log('Decoded user:', user); // Add this for debugging
            req.user = user;
            next();
        });
    } catch (error) {
        console.log('Auth middleware error:', error);
        return res.status(500).send({
            message: "Authentication error",
            success: false,
        });
    }
}