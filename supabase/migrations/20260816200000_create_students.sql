create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  student_code text unique,
  first_name text not null,
  last_name text not null,
  nickname text,
  gender text check (gender in ('ชาย','หญิง','ไม่ระบุ')),
  birth_date date,
  school_name text,
  grade_level text,
  class_room text,
  student_number integer,
  parent_name text,
  parent_phone text,
  address text,
  status text not null default 'กำลังศึกษา' check (status in ('กำลังศึกษา','ย้ายออก','จบการศึกษา','พักการเรียน')),
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists students_name_idx on public.students (last_name, first_name);
create index if not exists students_school_grade_idx on public.students (school_name, grade_level, class_room);
create index if not exists students_status_idx on public.students (status);
alter table public.students enable row level security;
create policy "Authenticated users can view students" on public.students for select to authenticated using (true);
create policy "Authenticated users can insert students" on public.students for insert to authenticated with check ((select auth.uid()) is not null);
create policy "Authenticated users can update students" on public.students for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete students" on public.students for delete to authenticated using (true);
grant select, insert, update, delete on public.students to authenticated;
revoke all on public.students from anon;
