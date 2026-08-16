# ระบบข้อมูลนักเรียน

เว็บแอปสำหรับจัดเก็บ ค้นหา เพิ่ม แก้ไข และลบข้อมูลนักเรียน โดยใช้ Supabase PostgreSQL เป็นฐานข้อมูล

## ฟีเจอร์
- เข้าสู่ระบบด้วย Magic Link
- Dashboard สรุปจำนวนนักเรียนทั้งหมด/กำลังศึกษา/ชาย/หญิง
- ค้นหาและกรองสถานะ
- เพิ่ม แก้ไข และลบข้อมูล
- Responsive สำหรับคอมพิวเตอร์และมือถือ

## Supabase
Project ref: `elakjcjdtmhacrcgpuuk`
Table: `public.students`

RLS เปิดใช้งานและอนุญาตเฉพาะ `authenticated` ในการอ่าน/เพิ่ม/แก้ไข/ลบข้อมูล ส่วน `anon` ถูกปิดสิทธิ์

## GitHub Pages
สาขาที่พัฒนา: `agent/student-record-app`
หลังตรวจสอบแล้วให้ merge เข้า `main` และเปิด Settings → Pages → Deploy from branch → `main` / root

## ความปลอดภัย
ใช้เฉพาะ Supabase publishable key บน browser ห้ามใส่ service role/secret key ใน frontend

ข้อมูลนักเรียนเป็นข้อมูลส่วนบุคคล ควรใช้งานในบัญชีและสภาพแวดล้อมที่มีการควบคุมสิทธิ์อย่างเหมาะสม
