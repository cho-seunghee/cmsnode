// utils/jwt-token.js
const jwt = require('jsonwebtoken');

const jwtSign = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"에서 토큰 추출
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    req.user = jwtVerify(token);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = { jwtSign, jwtVerify, authMiddleware };