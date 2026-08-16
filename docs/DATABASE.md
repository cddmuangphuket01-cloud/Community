# Database

Table: `public.students`

Primary key: `id` (UUID)

Indexes: student name, school/grade/class, status, created_by.

RLS: enabled. Anonymous access is revoked. Authenticated users can read and perform CRUD operations according to the current policies.
