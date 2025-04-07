const express = require('express');
const db = require('../config/db');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/create', authMiddleware, async (req, res) => {
  const { userid, menucd, menunm, menuaccess } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    await db.query('INSERT INTO tb_permissions (userid, menucd, menunm, menuaccess) VALUES (?, ?, ?, ?)', [userid, menucd, menunm, menuaccess]);
    res.json({ message: 'Permission created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/list', authMiddleware, async (req, res) => {
  const { userid, menucd, menunm } = req.body;
  try {
    let query = 'SELECT * FROM tb_permissions WHERE 1=1';
    const params = [];
    
    if (userid) {
      query += ' AND userid = ?';
      params.push(userid);
    }
    if (menucd) {
      query += ' AND menucd = ?';
      params.push(menucd);
    }
    if (menunm) {
      query += ' AND menunm = ?';
      params.push(menunm);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/update', authMiddleware, async (req, res) => {
  const { id, menucd, menunm, menuaccess } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    await db.query(
      'UPDATE tb_permissions SET menucd = ?, menunm = ?, menuaccess = ?, lastupdatedt = CURRENT_TIMESTAMP WHERE id = ?',
      [menucd, menunm, menuaccess, id]
    );
    res.json({ message: 'Permission updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/delete', authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  try {
    await db.query('DELETE FROM tb_permissions WHERE id = ?', [id]);
    res.json({ message: 'Permission deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;