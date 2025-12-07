# 🔒 Where to Find RLS (Row Level Security) in Supabase

## Quick Answer

RLS is found in the **Table Editor** → Select a table → **Policies** tab

---

## Step-by-Step: Finding RLS

### Method 1: Through Table Editor (Easiest)

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project

2. **Open Table Editor**
   - In the left sidebar, click **"Table Editor"** (or "Database" → "Tables")

3. **Select a Table**
   - Click on `teachers` table
   - Or click on `feedback` table

4. **Find the Policies Tab**
   - At the top of the table view, you'll see tabs like:
     - **Table** (shows data)
     - **Policies** ← **Click here!**
     - **Indexes**
     - **Relations**

5. **View RLS Status**
   - In the Policies tab, you'll see:
     - **RLS Enabled** toggle (should be ON/green)
     - List of policies below

---

## Method 2: Through SQL Editor

1. **Go to SQL Editor**
   - Click **SQL Editor** in left sidebar

2. **Run this query to check RLS:**
```sql
SELECT 
  tablename, 
  rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('teachers', 'feedback');
```

3. **Run this query to see policies:**
```sql
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('teachers', 'feedback')
ORDER BY tablename, policyname;
```

---

## Visual Guide

```
Supabase Dashboard
  └─ Your Project
      └─ Table Editor (left sidebar)
          └─ Click on "teachers" table
              └─ [Tabs at top]
                  ├─ Table (data view)
                  ├─ Policies ← CLICK HERE!
                  ├─ Indexes
                  └─ Relations
```

**In the Policies tab, you'll see:**

```
┌─────────────────────────────────────────┐
│ Row Level Security (RLS)                │
│ [✓] Enabled  ← Should be green/ON      │
├─────────────────────────────────────────┤
│ Policies:                                │
│                                          │
│ 1. "Anyone can view teachers"            │
│    Type: SELECT                          │
│    Roles: public                         │
│                                          │
│ 2. "Authenticated users can insert..."  │
│    Type: INSERT                          │
│    Roles: authenticated                  │
│                                          │
│ [+ New Policy] button                    │
└─────────────────────────────────────────┘
```

---

## What You Should See

### For `teachers` table:
- ✅ RLS Enabled: **ON** (green toggle)
- ✅ Policy: "Anyone can view teachers" (SELECT, public)
- ✅ Policy: "Authenticated users can insert teachers" (INSERT, authenticated)
- ✅ Policy: "Teachers can update own profile" (UPDATE, authenticated)

### For `feedback` table:
- ✅ RLS Enabled: **ON** (green toggle)
- ✅ Policy: "Anyone can view feedback for leaderboard" (SELECT, public)
- ✅ Policy: "Authenticated users can submit feedback" (INSERT, authenticated)

---

## If RLS is NOT Enabled

### Enable RLS via SQL Editor:

1. Go to **SQL Editor**
2. Run this SQL:

```sql
-- Enable RLS on teachers table
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Enable RLS on feedback table
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
```

3. Click **Run**

### Enable RLS via Table Editor:

1. Go to **Table Editor** → Select table
2. Click **Policies** tab
3. Toggle **"Row Level Security"** to **ON** (green)

---

## If Policies are Missing

If RLS is enabled but you don't see policies, you need to create them. Go to **SQL Editor** and run the complete migration file:

1. Open: `supabase/migrations/20251015154605_create_classpulse_schema.sql`
2. Copy the policy creation SQL (lines 92-118)
3. Paste into SQL Editor
4. Click **Run**

Or run this:

```sql
-- Teachers table policies
CREATE POLICY "Anyone can view teachers"
  ON teachers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert teachers"
  ON teachers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Teachers can update own profile"
  ON teachers FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'email' = email)
  WITH CHECK (auth.jwt()->>'email' = email);

-- Feedback table policies
CREATE POLICY "Anyone can view feedback for leaderboard"
  ON feedback FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can submit feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

---

## Quick Check Commands

### Check if RLS is enabled:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('teachers', 'feedback');
```

**Expected result:**
- `rowsecurity` should be `t` (true) for both tables

### List all policies:
```sql
SELECT tablename, policyname, cmd, roles
FROM pg_policies 
WHERE tablename IN ('teachers', 'feedback');
```

**Expected result:**
- Should see 5 policies total (3 for teachers, 2 for feedback)

---

## Troubleshooting

### Can't find Policies tab?
- Make sure you clicked on a table first (not just viewing the table list)
- The tabs appear at the top when viewing a specific table

### RLS toggle is grayed out?
- You might not have permissions
- Try enabling via SQL Editor instead

### Policies not showing?
- They might not be created yet
- Run the policy creation SQL from the migration file

---

## Summary

**Location:** Table Editor → Select table → **Policies** tab

**What to check:**
1. RLS Enabled toggle should be **ON** (green)
2. Should see policies listed below
3. If missing, enable RLS and create policies using SQL

**Quick access:**
- Table Editor → `teachers` → Policies tab
- Table Editor → `feedback` → Policies tab

