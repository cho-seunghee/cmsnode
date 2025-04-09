const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth');
const excelRoutes = require('./routes/excel');
const fileRoutes = require('./routes/file');
const permissionRoutes = require('./routes/admin/user-auth-manage');
const db = require('./config/db'); // 풀 가져오기
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://cho-seunghee.github.io', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.raw({ type: '*/*', limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/permissions', permissionRoutes);

// 서버 종료 시 풀 정리
const shutdown = async () => {
  console.log('Shutting down server...');
  await db.end(); // 풀의 모든 연결 종료
  console.log('Database pool closed');
  process.exit(0);
};

process.on('SIGINT', shutdown);  // Ctrl+C
process.on('SIGTERM', shutdown); // 종료 신호

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));