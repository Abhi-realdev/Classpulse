# 🗄️ Database Setup Guide

## ⚠️ IMPORTANT: You Need to Create Tables in Supabase

Your app needs two tables: `teachers` and `feedback`. You need to run the SQL migration to create them.

---

## Step-by-Step: Create Tables in Supabase

### Step 1: Open Supabase SQL Editor

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (the one with URL: `cqmzzffidzeaqoxhjwlw.supabase.co`)
3. In the left sidebar, click **SQL Editor** (or look for "SQL Editor" / "Database" → "SQL Editor")

### Step 2: Open the Migration File

1. In your project folder, open this file:
   ```
   supabase/migrations/20251015154605_create_classpulse_schema.sql
   ```
2. **Copy ALL the contents** of this file (Ctrl+A, then Ctrl+C)

### Step 3: Run the SQL in Supabase

1. In Supabase SQL Editor, you'll see a text area
2. **Paste the SQL code** you copied (Ctrl+V)
3. Click the **"Run"** button (or press Ctrl+Enter)
4. Wait for it to complete (should take a few seconds)

### Step 4: Verify Tables Were Created

1. In Supabase Dashboard, go to **Table Editor** (left sidebar)
2. You should see two tables:
   - ✅ `teachers`
   - ✅ `feedback`
3. Click on `teachers` table - you should see 10 sample teachers already inserted!

---

## What This Migration Creates

### Tables Created:

1. **`teachers` table**
   - Stores teacher information
   - Already has 10 sample teachers inserted

2. **`feedback` table**
   - Stores student feedback for teachers
   - Has 20 rating fields (1-5 scale)
   - Links to teachers via `teacher_id`

### Security (RLS Policies):

- ✅ Row Level Security (RLS) enabled on both tables
- ✅ Anyone can view teachers (for leaderboard)
- ✅ Authenticated users can submit feedback
- ✅ Public can view feedback (for leaderboard)

### Sample Data:

The migration automatically inserts 10 sample teachers:
- Dr. Rajesh Kumar (Mathematics)
- Mrs. Priya Sharma (Physics)
- Mr. Amit Verma (Chemistry)
- Ms. Anjali Singh (Biology)
- Dr. Suresh Patel (English)
- Mrs. Kavita Gupta (Hindi)
- Mr. Vikram Reddy (Computer Science)
- Ms. Neha Joshi (History)
- Dr. Ramesh Yadav (Geography)
- Mrs. Sunita Das (Economics)

---

## Alternative: Quick Copy-Paste Method

If you prefer, here's the SQL code ready to paste:

```sql
-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE NOT NULL,
  student_email text NOT NULL,
  subject text NOT NULL,
  clarity_explanation integer NOT NULL CHECK (clarity_explanation >= 1 AND clarity_explanation <= 5),
  simplification integer NOT NULL CHECK (simplification >= 1 AND simplification <= 5),
  examples_analogies integer NOT NULL CHECK (examples_analogies >= 1 AND examples_analogies <= 5),
  engagement integer NOT NULL CHECK (engagement >= 1 AND engagement <= 5),
  pace_teaching integer NOT NULL CHECK (pace_teaching >= 1 AND pace_teaching <= 5),
  depth_knowledge integer NOT NULL CHECK (depth_knowledge >= 1 AND depth_knowledge <= 5),
  accuracy_info integer NOT NULL CHECK (accuracy_info >= 1 AND accuracy_info <= 5),
  concept_reinforcement integer NOT NULL CHECK (concept_reinforcement >= 1 AND concept_reinforcement <= 5),
  problem_solving integer NOT NULL CHECK (problem_solving >= 1 AND problem_solving <= 5),
  clarity_instructions integer NOT NULL CHECK (clarity_instructions >= 1 AND clarity_instructions <= 5),
  patience_approachability integer NOT NULL CHECK (patience_approachability >= 1 AND patience_approachability <= 5),
  motivation_encouragement integer NOT NULL CHECK (motivation_encouragement >= 1 AND motivation_encouragement <= 5),
  adaptability integer NOT NULL CHECK (adaptability >= 1 AND adaptability <= 5),
  visual_aids integer NOT NULL CHECK (visual_aids >= 1 AND visual_aids <= 5),
  technology_integration integer NOT NULL CHECK (technology_integration >= 1 AND technology_integration <= 5),
  interactive_methods integer NOT NULL CHECK (interactive_methods >= 1 AND interactive_methods <= 5),
  helping_understand integer NOT NULL CHECK (helping_understand >= 1 AND helping_understand <= 5),
  critical_thinking integer NOT NULL CHECK (critical_thinking >= 1 AND critical_thinking <= 5),
  homework_support integer NOT NULL CHECK (homework_support >= 1 AND homework_support <= 5),
  openness_feedback integer NOT NULL CHECK (openness_feedback >= 1 AND openness_feedback <= 5),
  comments text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_teacher_id ON feedback(teacher_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- Insert sample teachers
INSERT INTO teachers (name, subject, email, avatar_url) VALUES
  ('Dr. Rajesh Kumar', 'Mathematics', 'rajesh.kumar@sunbeam.edu.in', ''),
  ('Mrs. Priya Sharma', 'Physics', 'priya.sharma@sunbeam.edu.in', ''),
  ('Mr. Amit Verma', 'Chemistry', 'amit.verma@sunbeam.edu.in', ''),
  ('Ms. Anjali Singh', 'Biology', 'anjali.singh@sunbeam.edu.in', ''),
  ('Dr. Suresh Patel', 'English', 'suresh.patel@sunbeam.edu.in', ''),
  ('Mrs. Kavita Gupta', 'Hindi', 'kavita.gupta@sunbeam.edu.in', ''),
  ('Mr. Vikram Reddy', 'Computer Science', 'vikram.reddy@sunbeam.edu.in', ''),
  ('Ms. Neha Joshi', 'History', 'neha.joshi@sunbeam.edu.in', ''),
  ('Dr. Ramesh Yadav', 'Geography', 'ramesh.yadav@sunbeam.edu.in', ''),
  ('Mrs. Sunita Das', 'Economics', 'sunita.das@sunbeam.edu.in', '')
ON CONFLICT (email) DO NOTHING;
```

**Just copy the entire block above and paste it into Supabase SQL Editor, then click Run!**

---

## Visual Guide

```
Supabase Dashboard
  └─ Your Project
      └─ SQL Editor (left sidebar)
          └─ [Paste SQL code here]
              └─ [Click "Run" button]
                  └─ ✅ Tables created!
```

---

## Troubleshooting

### If you get an error "relation already exists":
- The tables might already exist
- This is OK - the `CREATE TABLE IF NOT EXISTS` will skip creation
- Check Table Editor to see if tables are there

### If you get a permission error:
- Make sure you're logged into Supabase
- Make sure you're in the correct project
- Try refreshing the page

### If tables don't appear:
- Refresh the Table Editor page
- Check if there are any error messages in SQL Editor
- Make sure you ran ALL the SQL (not just part of it)

---

## After Setup: Verify Everything Works

1. ✅ Tables created (check Table Editor)
2. ✅ Sample teachers inserted (should see 10 teachers)
3. ✅ RLS policies active (security enabled)
4. ✅ Try logging in to your app
5. ✅ Try submitting feedback
6. ✅ Check leaderboard shows teachers

---

## Next Steps

Once tables are created:
1. ✅ Your app should work!
2. ✅ You can log in/sign up
3. ✅ You can submit feedback
4. ✅ Leaderboard will show teachers

**You're all set! 🎉**

