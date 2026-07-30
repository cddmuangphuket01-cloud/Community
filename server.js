require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const leaderRoutes = require('./routes/leaders');

const app = express();

// เชื่อมต่อฐานข้อมูล MongoDB (ออนไลน์ผ่าน MongoDB Atlas)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/leaders', leaderRoutes);

// health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'เซิร์ฟเวอร์ทำงานปกติ' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:${PORT}`);
});
