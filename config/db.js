require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // 최대 연결 수
  waitForConnections: true, // 연결 대기 여부
  queueLimit: 0 // 대기열 무제한 (필요 시 조정)
});

module.exports = pool;