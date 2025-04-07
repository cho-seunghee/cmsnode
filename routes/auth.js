const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  try {
    console.log('Received:', { userid, password });

    const [rows] = await db.query('SELECT * FROM tb_userinfo WHERE userid = ? AND pwd = ?', [userid, password]); // 'pwd' → 'password'
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    
    const user = rows[0];
    console.log(user);
    const token = jwt.sign({ userid: user.userid, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);

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

module.exports = router;