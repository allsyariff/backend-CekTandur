// const { admin } = require('../config/config');

// const isAuthenticated = async (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) return res.status(403).json({ error: 'No token provided' });

//     try {
//         await admin.auth().verifyIdToken(token);
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token' });
//     }
// };

// module.exports = isAuthenticated;
 