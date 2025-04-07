const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// 로그인
router.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM tb_userinfo WHERE userid = ? AND pwd = ?', [userid, password]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    
    const user = rows[0];
    const token = jwt.sign({ userid: user.userid, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1m' });

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    
    res.json({ 
      token, 
      user: { 
        userid: user.userid, 
        username: user.usernm,
        role: user.role,
        ip: clientIp
      } 
    });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 사용자 정보 조회 (JWT 인증)
router.post('/me', async (req, res) => {
  const { token } = req.body; // 본문에서 토큰 읽기
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db.query('SELECT * FROM tb_userinfo WHERE userid = ?', [decoded.userid]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
    
    res.json({
      user: {
        userid: user.userid,
        username: user.usernm,
        role: user.role,
        ip: clientIp
      }
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;