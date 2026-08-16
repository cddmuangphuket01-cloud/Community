import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const SUPABASE_URL = 'https://elakjcjdtmhacrcgpuuk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_WunktiObNEpkOI2wtGgNcg_Jl6tLZW4';
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const $ = (id) => document.getElementById(id);
let students = [];
let editingId = null;

function showMessage(text, type = 'success') { const el = $('message'); el.textContent = text; el.className = `message ${type}`; setTimeout(() => el.className = 'message hidden', 3500); }
function escapeHtml(v = '') { return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function statusBadge(s) { return `<span class="badge ${s === 'กำลังศึกษา' ? 'green' : 'gray'}">${escapeHtml(s)}</span>`; }

async function loadStudents() {
  const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
  if (error) { showMessage(error.message, 'error'); return; }
  students = data || []; render();
}

function render() {
  const q = $('searchInput').value.trim().toLowerCase(); const status = $('statusFilter').value;
  const rows = students.filter(s => (!status || s.status === status) && (!q || [s.student_code,s.first_name,s.last_name,s.school_name,s.parent_name].some(x => String(x || '').toLowerCase().includes(q))));
  $('studentTable').innerHTML = rows.length ? rows.map(s => `<tr><td><strong>${escapeHtml(s.student_code || '-')}</strong></td><td><strong>${escapeHtml(s.first_name)} ${escapeHtml(s.last_name)}</strong><small>${escapeHtml(s.nickname ? `ชื่อเล่น: ${s.nickname}` : '')}</small></td><td>${escapeHtml(s.gender || '-')}</td><td>${escapeHtml(s.school_name || '-')}</td><td>${escapeHtml([s.grade_level,s.class_room ? `ห้อง ${s.class_room}` : ''].filter(Boolean).join(' / ') || '-')}</td><td>${escapeHtml(s.parent_name || '-')}<small>${escapeHtml(s.parent_phone || '')}</small></td><td>${statusBadge(s.status)}</td><td class="actions"><button class="link-btn" data-edit="${s.id}">แก้ไข</button><button class="link-btn danger" data-delete="${s.id}">ลบ</button></td></tr>`).join('') : '<tr><td colspan="8" class="empty">ไม่พบข้อมูลนักเรียน</td></tr>';
  $('totalCount').textContent = students.length; $('activeCount').textContent = students.filter(s => s.status === 'กำลังศึกษา').length; $('maleCount').textContent = students.filter(s => s.gender === 'ชาย').length; $('femaleCount').textContent = students.filter(s => s.gender === 'หญิง').length;
}

function openDialog(student = null) {
  editingId = student?.id || null; $('dialogTitle').textContent = editingId ? 'แก้ไขข้อมูลนักเรียน' : 'เพิ่มข้อมูลนักเรียน';
  const map = {studentCode:'student_code',firstName:'first_name',lastName:'last_name',nickname:'nickname',gender:'gender',birthDate:'birth_date',schoolName:'school_name',gradeLevel:'grade_level',classRoom:'class_room',studentNumber:'student_number',parentName:'parent_name',parentPhone:'parent_phone',address:'address',status:'status',notes:'notes'};
  Object.entries(map).forEach(([id,key]) => $(id).value = student?.[key] ?? (id === 'gender' ? 'ไม่ระบุ' : id === 'status' ? 'กำลังศึกษา' : ''));
  $('studentDialog').showModal();
}
function closeDialog() { $('studentDialog').close(); }

async function saveStudent(e) {
  e.preventDefault(); const user = (await supabase.auth.getUser()).data.user; if (!user) return showMessage('กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล', 'error');
  const payload = { student_code:$('studentCode').value.trim() || null, first_name:$('firstName').value.trim(), last_name:$('lastName').value.trim(), nickname:$('nickname').value.trim() || null, gender:$('gender').value, birth_date:$('birthDate').value || null, school_name:$('schoolName').value.trim() || null, grade_level:$('gradeLevel').value.trim() || null, class_room:$('classRoom').value.trim() || null, student_number:$('studentNumber').value ? Number($('studentNumber').value) : null, parent_name:$('parentName').value.trim() || null, parent_phone:$('parentPhone').value.trim() || null, address:$('address').value.trim() || null, status:$('status').value, notes:$('notes').value.trim() || null, created_by:user.id };
  const result = editingId ? await supabase.from('students').update(payload).eq('id', editingId) : await supabase.from('students').insert(payload);
  if (result.error) return showMessage(result.error.message, 'error'); closeDialog(); showMessage(editingId ? 'แก้ไขข้อมูลเรียบร้อยแล้ว' : 'บันทึกข้อมูลเรียบร้อยแล้ว'); await loadStudents();
}
async function deleteStudent(id) { if (!confirm('ยืนยันการลบข้อมูลนักเรียนรายการนี้?')) return; const { error } = await supabase.from('students').delete().eq('id', id); if (error) return showMessage(error.message, 'error'); showMessage('ลบข้อมูลเรียบร้อยแล้ว'); await loadStudents(); }

async function updateAuthUI() { const { data:{ user } } = await supabase.auth.getUser(); $('addBtn').disabled = !user; $('authArea').innerHTML = user ? `<span class="user-email">${escapeHtml(user.email || '')}</span><button id="logoutBtn" class="btn btn-light">ออกจากระบบ</button>` : '<button id="loginBtn" class="btn btn-light">เข้าสู่ระบบ</button>'; if (user) { $('logoutBtn').onclick = async () => { await supabase.auth.signOut(); location.reload(); }; await loadStudents(); } else { $('studentTable').innerHTML = '<tr><td colspan="8" class="empty">กรุณาเข้าสู่ระบบเพื่อดูข้อมูล</td></tr>'; } }
async function login() { const email = prompt('กรอกอีเมลสำหรับเข้าสู่ระบบ'); if (!email) return; const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: location.href } }); if (error) showMessage(error.message, 'error'); else alert('ส่งลิงก์เข้าสู่ระบบไปยังอีเมลแล้ว กรุณาตรวจสอบกล่องจดหมาย'); }

$('loginBtn').onclick = login; $('addBtn').onclick = () => openDialog(); $('closeDialog').onclick = closeDialog; $('cancelBtn').onclick = closeDialog; $('studentForm').onsubmit = saveStudent; $('searchInput').oninput = render; $('statusFilter').onchange = render; $('refreshBtn').onclick = loadStudents;
$('studentTable').onclick = (e) => { const edit = e.target.dataset.edit, del = e.target.dataset.delete; if (edit) openDialog(students.find(s => s.id === edit)); if (del) deleteStudent(del); };
supabase.auth.onAuthStateChange(() => updateAuthUI()); updateAuthUI();
