const express = require('express');
const excelRoutes = require('../routes/excelRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/excel', excelRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));