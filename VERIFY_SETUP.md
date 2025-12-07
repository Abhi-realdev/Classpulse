# ✅ Verify Your Setup - What's Next?

## 🎉 Great! You've Created the Tables

Now let's verify everything is set up correctly and test your app.

---

## ✅ Checklist: Verify Everything is Set Up

### 1. ✅ Database Tables Created
- [ ] `teachers` table exists
- [ ] `feedback` table exists
- [ ] Both tables have the correct columns

**How to verify:**
1. Go to Supabase Dashboard → **Table Editor**
2. You should see both `teachers` and `feedback` tables
3. Click on `teachers` - should have columns: `id`, `name`, `subject`, `email`, `avatar_url`, `created_at`
4. Click on `feedback` - should have many columns (20+ rating fields)

### 2. ✅ Sample Data Inserted
- [ ] `teachers` table has 10 sample teachers

**How to verify:**
1. Go to Supabase Dashboard → **Table Editor** → `teachers`
2. You should see 10 rows with teachers like:
   - Dr. Rajesh Kumar (Mathematics)
   - Mrs. Priya Sharma (Physics)
   - etc.

**If you don't see sample teachers:**
- Go to **SQL Editor** in Supabase
- Run this SQL to insert them:
```sql
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

### 3. ✅ Row Level Security (RLS) Enabled
- [ ] RLS is enabled on both tables
- [ ] Policies are created

**How to verify:**
1. Go to Supabase Dashboard → **Authentication** → **Policies**
2. Or go to **Table Editor** → Click on a table → **Policies** tab
3. You should see policies like:
   - "Anyone can view teachers"
   - "Authenticated users can submit feedback"
   - etc.

**If RLS is not enabled:**
- Go to **SQL Editor** and run:
```sql
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
```

### 4. ✅ Environment Variables Set
- [ ] `.env` file exists
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_ANON_KEY` is set

**How to verify:**
- Check your `.env` file in the project root
- Should have both variables

### 5. ✅ CORS Configured
- [ ] `http://localhost:5173` (or your port) is in Supabase Allowed Origins

**How to verify:**
1. Go to Supabase Dashboard → **Settings** → **API**
2. Scroll to **"Allowed Origins"**
3. Should see `http://localhost:5173` (or your dev server port)

### 6. ✅ Email Authentication Enabled
- [ ] Email provider is enabled in Supabase

**How to verify:**
1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. **Email** provider should be **enabled**
3. If not, click to enable it

---

## 🚀 Next Steps: Test Your App

### Step 1: Start Your Dev Server
```bash
npm run dev
```

### Step 2: Open Your App
- Open browser to `http://localhost:5173` (or your port)
- You should see the ClassPulse landing page

### Step 3: Test Sign Up
1. Click "Don't have an account? Sign up"
2. Enter an email and password
3. Click "Sign Up"
4. Should work without errors!

### Step 4: Test Sign In
1. If you signed up, try signing in with the same credentials
2. Should redirect you to the feedback form

### Step 5: Test Feedback Form
1. After logging in, you should see the feedback form
2. Select a teacher from the dropdown
3. Fill in ratings (1-5 for each field)
4. Submit feedback
5. Should see success message!

### Step 6: Test Leaderboard
1. Click on "Leaderboard" in navigation
2. Should see list of teachers with their ratings
3. Teachers should be sorted by average rating

---

## 🐛 Troubleshooting

### If you can't sign up/login:
- ✅ Check CORS is configured (see step 5 above)
- ✅ Check `.env` file has correct values
- ✅ Restart dev server after `.env` changes
- ✅ Check browser console (F12) for errors

### If feedback form doesn't show teachers:
- ✅ Check `teachers` table has data (see step 2 above)
- ✅ Check browser console for errors
- ✅ Verify RLS policies allow reading teachers

### If you can't submit feedback:
- ✅ Check you're logged in
- ✅ Check RLS policies allow inserting feedback
- ✅ Check browser console for errors

### If leaderboard is empty:
- ✅ Check `feedback` table has data
- ✅ Check RLS policies allow reading feedback
- ✅ Try submitting some feedback first

---

## 📋 Quick SQL Commands (if needed)

### Check if tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('teachers', 'feedback');
```

### Check if RLS is enabled:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('teachers', 'feedback');
```

### Check sample teachers:
```sql
SELECT * FROM teachers;
```

### Check policies:
```sql
SELECT * FROM pg_policies 
WHERE tablename IN ('teachers', 'feedback');
```

---

## ✅ Final Checklist

Before you start using the app, make sure:

- [ ] Tables created (`teachers` and `feedback`)
- [ ] Sample teachers inserted (10 teachers)
- [ ] RLS enabled on both tables
- [ ] Policies created
- [ ] `.env` file configured
- [ ] CORS configured in Supabase
- [ ] Email authentication enabled
- [ ] Dev server running
- [ ] Can sign up/login
- [ ] Can see teachers in feedback form
- [ ] Can submit feedback
- [ ] Can see leaderboard

---

## 🎉 You're Ready!

If all checkboxes are checked, your app should be fully functional!

**Start using ClassPulse:**
1. Sign up for an account
2. Submit feedback for teachers
3. View the leaderboard
4. Check teacher dashboard (if logged in as a teacher)

**Happy coding! 🚀**

