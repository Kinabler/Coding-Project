const accessToken = (req, res, next) => {
    // Allow preflight OPTIONS requests to pass through without token check
    if (req.method === 'OPTIONS') {
        return next();
    }

    const whiteList = ["/", "/login", "/register"];
    console.log(">>> check request path:", req.originalUrl); // Fixed property name (lowercase 'o')

    // Check for the presence of the Authorization header
    // and verify that it starts with 'Bearer'
    if (req?.headers?.authorization?.startsWith('Bearer') && req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        // Verify the token here (e.g., using JWT verification)

        // console.log('>>> Token:', token);
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
}

module.exports = accessToken;