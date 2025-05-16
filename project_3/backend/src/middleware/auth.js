const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Allow preflight OPTIONS requests to pass through without token check
    if (req.method === 'OPTIONS') {
        return next();
    }

    const whiteList = ["/", "/user/login", "/user/register"];
    // console.log(">>> check request path:", req.path);
    // Check if the request path is in the whitelist
    if (whiteList.includes(req.path)) {
        return next();
    }

    // Check for the presence of the Authorization header
    // and verify that it starts with 'Bearer'
    if (req?.headers?.authorization?.startsWith('Bearer') && req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        // Verify the token here (e.g., using JWT verification)
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            // console.log('>>> Token:', decodedToken);
            req.user = {
                email: decodedToken.email,
                username: decodedToken.username,
                role: decodedToken.role,
            }
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.log('Token expired');
                return res.status(401).json({ message: 'Unauthorized: Token expired' });
            } else {
                // Handle other JWT errors (e.g., invalid token)
                console.log('Token invalid');
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
        }
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
}

module.exports = auth;