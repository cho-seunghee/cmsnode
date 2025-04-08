const express = require('express');
const db = require('../../config/db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userAuthMngSql = require('../../sqls/admin/userauthmngsql');
const { execSql } = require('../../utils/execsql');

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
  const { userid, menucd, menitiaunm, menuaccess } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });

  try {
    const createQuery = userAuthMngSql.getCreatePermissionQuery();
    await execSql(db, createQuery, [userid, menucd, menunm, menuaccess]);
    res.json({ message: 'Permission created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/list', authMiddleware, async (req, res) => {
  const { userid, menucd, menunm } = req.body;

  try {
    let listQuery = userAuthMngSql.getListPermissionsQuery();
    let query = listQuery.query;
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

    const updatedQuery = { query, params }; // Create a new query object with dynamic SQL
    const [rows] = await execSql(db, updatedQuery, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/update', authMiddleware, async (req, res) => {
  const { id, menucd, menunm, menuaccess } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });

  try {
    const updateQuery = userAuthMngSql.getUpdatePermissionQuery();
    await execSql(db, updateQuery, [menucd, menunm, menuaccess, id]);
    res.json({ message: 'Permission updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/delete', authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });

  try {
    const deleteQuery = userAuthMngSql.getDeletePermissionQuery();
    await execSql(db, deleteQuery, [id]);
    res.json({ message: 'Permission deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;