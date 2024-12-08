/* const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Access Denied. No token provided."
        });
    }

    // Verifikasi token
    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: "Invalid token."
            });
        }
        req.user = user; // Simpan user data di req.user
        next();
    });
};

module.exports = { authenticateToken }; */