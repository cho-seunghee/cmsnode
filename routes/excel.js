const express = require('express');
const multer = require('multer');
const ExcelJS = require('exceljs');
const db = require('../config/db');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('excel'), async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(req.file.path);
  const worksheet = workbook.getWorksheet(1);

  const headers = worksheet.getRow(1).values.slice(1);
  const data = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const rowData = {};
      headers.forEach((header, index) => {
        let value = row.values[index + 1];
        if (typeof value === 'number') {
          value = value.toString().replace(/,/g, '');
          rowData[header] = value ? Number(value) : 0;
        } else if (value instanceof Date) {
          rowData[header] = value.toISOString().split('T')[0];
        } else {
          rowData[header] = value || '';
        }
      });
      data.push(rowData);
    }
  });

  try {
    for (const item of data) {
      await db.query('INSERT INTO tb_userinfo (userid, username, password, email, role) VALUES (?, ?, ?, ?, ?)', 
        [item.userid, item.username, item.password, item.email, item.role || 'employee']);
    }
    res.json({ message: 'Employee data uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;