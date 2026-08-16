# ระบบข้อมูลนักเรียน

เว็บแอปสำหรับจัดเก็บ ค้นหา เพิ่ม แก้ไข และลบข้อมูลนักเรียน โดยใช้ Supabase PostgreSQL เป็นฐานข้อมูล

## เทคโนโลยี
- HTML/CSS/JavaScript (ES Modules)
- Supabase JS
- Supabase Auth (Magic Link)
- Supabase PostgreSQL + Row Level Security (RLS)

## ฐานข้อมูล
โปรเจกต์ Supabase: `elakjcjdtmhacrcgpuuk`
ตารางหลัก: `public.students`

ตารางมีข้อมูลรหัสนักเรียน ชื่อ-นามสกุล ชื่อเล่น เพศ วันเกิด โรงเรียน ชั้น ห้อง เลขที่ ผู้ปกครอง เบอร์โทร ที่อยู่ สถานะ และหมายเหตุ

## ความปลอดภัย
- เปิด RLS ที่ `public.students`
- อนุญาตเฉพาะผู้ใช้ที่ authenticated ในการอ่าน/เพิ่ม/แก้ไข/ลบ
- ใช้ Supabase publishable key สำหรับฝั่ง browser
- ห้ามนำ `service_role` หรือ secret key มาใส่ใน frontend

## การใช้งาน
เปิด `index.html` ผ่าน static hosting ได้ เช่น GitHub Pages, Netlify หรือ Cloudflare Pages

หากนำไปใช้กับ GitHub Pages ให้เปิดใช้งาน Pages จาก branch `main` หลัง merge สาขา `agent/student-record-app`

> ข้อมูลนักเรียนเป็นข้อมูลส่วนบุคคล ควรจำกัดบัญชีผู้ใช้งานและสิทธิ์การเข้าถึงให้เหมาะสมก่อนใช้งานจริง
