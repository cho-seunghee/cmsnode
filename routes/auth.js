const express = require('express');
const { jwtSign, jwtVerify } = require('../utils/jwtoken');
const { clientIp } = require('../utils/common');
const db = require('../config/db');
const authsql = require('../sqls/auth/authsql');
const { execSql } = require('../utils/execsql');
const router = express.Router();

let userInfo = {
  userid: '',
  username: '',
  role: '',
  ip: ''
};

const setUserInfo = (req, res, user, token, gubun) => {
  const clientIpValue = clientIp(req);

  userInfo.userid = user.userid;
  userInfo.username = user.usernm;
  userInfo.role = user.role;
  userInfo.ip = clientIpValue;

  if(gubun === 'login')
  {
    res.json({
      token,
      user: userInfo
    });
  }
  else
  {
    res.json({
      user: userInfo
    });
  }
}

// 로그인
router.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  try {
    const loginQuery = authsql.getLoginQuery();
    const [rows] = await execSql(db, loginQuery, [userid, password]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const token = jwtSign({ userid: user.userid, role: user.role });

    setUserInfo(req, res, user, token, 'login');
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 사용자 정보 조회 (JWT 인증)
router.post('/me', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwtVerify(token);
    const userCheckQuery = authsql.getUserCheckQuery();

    const [rows] = await execSql(db, userCheckQuery, [decoded.userid]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];

    setUserInfo(req, res, user, '', 'me');
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.log('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;