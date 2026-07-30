# ระบบฐานข้อมูลผู้นำชุมชน (Community Leader Database)

เว็บแอปสำหรับจัดเก็บและจัดการข้อมูลผู้นำชุมชน (ผู้ใหญ่บ้าน, กำนัน, ประธานชุมชน ฯลฯ)
เชื่อมต่อกับฐานข้อมูล **MongoDB Atlas** ซึ่งเป็นฐานข้อมูลออนไลน์บนคลาวด์ (ฟรี)

## เทคโนโลยีที่ใช้
- **Backend:** Node.js + Express
- **Database:** MongoDB (ผ่าน Mongoose) — ใช้ MongoDB Atlas เป็นฐานข้อมูลออนไลน์
- **Frontend:** HTML / CSS / JavaScript (Vanilla, ไม่ต้องใช้ Framework)

## โครงสร้างโปรเจกต์
```
community-leader-app/
├── config/
│   └── db.js          # การเชื่อมต่อ MongoDB
├── models/
│   └── Leader.js       # Schema ของผู้นำชุมชน
├── routes/
│   └── leaders.js      # REST API: GET/POST/PUT/DELETE
├── public/
│   ├── index.html       # หน้าเว็บหลัก
│   ├── style.css
│   └── script.js         # เรียก API และจัดการ UI
├── server.js             # จุดเริ่มต้นแอป
├── package.json
└── .env.example
```

## ขั้นตอนการติดตั้งและใช้งาน

### 1. สมัคร MongoDB Atlas (ฐานข้อมูลออนไลน์ฟรี)
1. ไปที่ https://www.mongodb.com/cloud/atlas/register แล้วสมัครสมาชิก (ฟรี)
2. สร้าง Cluster แบบฟรี (M0)
3. ไปที่ **Database Access** สร้าง user + password สำหรับเชื่อมต่อ
4. ไปที่ **Network Access** เพิ่ม IP `0.0.0.0/0` (อนุญาตทุกที่ สำหรับทดสอบ) หรือ IP ของเครื่องที่ใช้งานจริง
5. ไปที่ **Database > Connect > Drivers** คัดลอก Connection String รูปแบบ:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/community_leader_db?retryWrites=true&w=majority
   ```

### 2. ติดตั้งโปรเจกต์
```bash
cd community-leader-app
npm install
```

### 3. ตั้งค่าไฟล์ .env
```bash
cp .env.example .env
```
แล้วแก้ไขค่า `MONGODB_URI` ในไฟล์ `.env` ให้เป็น Connection String ของคุณจากขั้นตอนที่ 1

### 4. รันเซิร์ฟเวอร์
```bash
npm start
```
หรือระหว่างพัฒนา (auto-reload):
```bash
npm run dev
```

### 5. เปิดใช้งาน
เปิดเบราว์เซอร์ไปที่ **http://localhost:3000**

## ฟีเจอร์ที่มี
- ➕ เพิ่มข้อมูลผู้นำชุมชน (ชื่อ, ตำแหน่ง, ชุมชน, ที่อยู่, เบอร์โทร, อีเมล, วันที่ดำรงตำแหน่ง, สถานะ)
- 📋 แสดงรายการทั้งหมดในรูปแบบตาราง
- 🔍 ค้นหาจากชื่อ / ชุมชน / จังหวัด / ตำแหน่ง
- 🏷️ กรองตามสถานะ (ปฏิบัติหน้าที่ / พ้นตำแหน่ง)
- ✏️ แก้ไขข้อมูล
- 🗑️ ลบข้อมูล

## API Endpoints
| Method | Endpoint             | คำอธิบาย                          |
|--------|-----------------------|-----------------------------------|
| GET    | /api/leaders           | ดึงรายชื่อทั้งหมด (รองรับ query `q`, `status`, `province`) |
| GET    | /api/leaders/:id       | ดึงข้อมูลรายบุคคล                  |
| POST   | /api/leaders           | เพิ่มข้อมูลใหม่                     |
| PUT    | /api/leaders/:id       | แก้ไขข้อมูล                        |
| DELETE | /api/leaders/:id       | ลบข้อมูล                          |

## หมายเหตุ
- ห้าม commit ไฟล์ `.env` ขึ้น Git (มี `.gitignore` ป้องกันไว้แล้ว)
- สามารถ deploy ขึ้นบริการอย่าง Render, Railway, หรือ Vercel (สำหรับ backend) ได้ทันที
  โดยตั้งค่า Environment Variable `MONGODB_URI` บนแพลตฟอร์มนั้นๆ
