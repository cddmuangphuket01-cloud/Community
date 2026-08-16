# วิธีเปิดใช้งาน

1. Merge branch `agent/student-record-app` เข้า `main`
2. GitHub → Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` และ folder `/ (root)`
5. Save แล้วรอ GitHub Pages deploy

ก่อนใช้งานจริง ให้ตั้งค่า Supabase Auth → URL Configuration → Site URL เป็น URL ของ GitHub Pages และเพิ่ม Redirect URL เดียวกัน เพื่อให้ Magic Link กลับเข้าเว็บได้ถูกต้อง
