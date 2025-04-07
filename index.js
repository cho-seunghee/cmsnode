const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const excelRoutes = require('./routes/excel');
const fileRoutes = require('./routes/file');
const permissionRoutes = require('./routes/permissions');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.raw({ type: '*/*', limit: '10mb' })); // 파일 업로드용

app.use('/api/auth', authRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/permissions', permissionRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));