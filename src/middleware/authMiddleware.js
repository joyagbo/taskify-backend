const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token. Authorization denied." });
    };

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid." });
    }
};
// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};


module.exports = { authMiddleware, adminMiddleware };
