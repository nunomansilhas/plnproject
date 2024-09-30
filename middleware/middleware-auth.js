const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Use your actual secret key

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id; // Save the user ID for future use
        next();
    });
};
