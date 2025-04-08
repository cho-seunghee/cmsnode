const jwt = require('jsonwebtoken');

const jwtSign = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { jwtSign, jwtVerify };