const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const excelRoutes = require('./routes/excel');
const fileRoutes = require('./routes/file');
const permissionRoutes = require('./routes/permissions');

const app = express();

app.use(cors({
  origin: ['https://cho-seunghee.github.io', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.raw({ type: '*/*', limit: '10mb' })); // 파일 업로드용

app.use('/api/auth', authRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/permissions', permissionRoutes);

// 동적 포트 설정
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));