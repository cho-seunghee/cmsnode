const express = require('express');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
  const { module, filename } = req.query;
  const fileContent = req.body;
  const uploadby = req.user.userid;
  const uploadmon = new Date().toISOString().slice(0, 7).replace('-', '');
  const uploaddt = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  try {
    const [result] = await pool.query(
      'INSERT INTO tb_files (module, filename, filecontent, uploadby, uploadmon, uploaddt) VALUES (?, ?, ?, ?, ?, ?)',
      [module, filename, fileContent, uploadby, uploadmon, uploaddt]
    );
    res.json({ id: result.insertId, message: 'File created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/read', authMiddleware, async (req, res) => {
  const { id } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM tb_files WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'File not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;