# ClassPulse - Authentication Setup & Troubleshooting

## ⚠️ IMPORTANT: Setup Required Before First Use

### Step 1: Create Environment Variables File

1. Create a `.env` file in the root directory of your project (same level as `package.json`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get your Supabase credentials:**

1. **Go to Supabase Dashboard**
   - Visit: [https://app.supabase.com](https://app.supabase.com)
   - Sign in with your account

2. **Select Your Project**
   - Click on your project from the list
   - If you don't have a project, click **"New Project"** to create one

3. **Navigate to API Settings**
   - In the left sidebar, click **Settings** (⚙️ gear icon)
   - Click **API** in the settings menu

4. **Find Your Credentials**
   - **Project URL**: Look for **"Project URL"** or **"API URL"** section
     - It will look like: `https://xxxxxxxxxxxxx.supabase.co`
     - Copy this entire URL → use as `VITE_SUPABASE_URL` in your `.env` file
   - **anon/public key**: Look for **"Project API keys"** section
     - Find the **"anon"** or **"public"** key (NOT the "service_role" key)
     - Click the eye icon or copy button to reveal it
     - Copy this key → use as `VITE_SUPABASE_ANON_KEY` in your `.env` file

**Visual Guide:**
```
Supabase Dashboard
  └─ Your Project
      └─ Settings (⚙️)
          └─ API
              ├─ Project URL: https://xxxxx.supabase.co  ← Copy this
              └─ Project API keys
                  └─ anon public: eyJhbGc...  ← Copy this (NOT service_role)
```

### Step 2: Restart Development Server

After creating the `.env` file, **restart your development server**:
- Stop the current server (Ctrl+C)
- Run `npm run dev` again

**Note:** Environment variables are only loaded when the server starts, so you must restart after creating/updating `.env`

## Required Supabase Configuration

### 1. Enable Email Authentication
- Go to Supabase Dashboard → **Authentication** → **Providers**
- Enable **"Email"** provider
- Set email templates as needed

### 2. Configure Site URL and CORS
- Go to Supabase Dashboard → **Authentication** → **URL Configuration**
- Add your localhost URL: `http://localhost:5173` (or your dev server port)
- Add your production URL when deploying

**IMPORTANT - CORS Configuration:**
- Go to Supabase Dashboard → **Settings** → **API**
- Under **Allowed Origins**, add:
  - `http://localhost:5173` (or your dev server port)
  - `http://localhost:3000` (if using different port)
  - Your production URL when deploying
- Click **Save** after adding origins

### 3. Email Confirmation (Recommended for Development)
- Go to Supabase Dashboard → **Authentication** → **Settings**
- **Disable "Confirm email"** requirement for easier development
- Or set up SMTP for email confirmations if you want email verification

## Troubleshooting "Failed to fetch" / Connection Errors

If you see connection errors when trying to login/signup, follow these steps **in order**:

### Step 1: Verify Environment Variables
1. **Check if `.env` file exists** in the root directory
2. **Verify environment variables are set correctly:**
   - Open browser console (F12)
   - Look for "Supabase URL: ..." log message
   - If it says "NOT SET", your `.env` file is not being read
3. **Restart your dev server** after creating/updating `.env`
   - Stop server (Ctrl+C)
   - Run `npm run dev` again

### Step 2: Check Supabase Project Status
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Make sure your project is **active** (not paused)
3. If paused, click "Resume" to activate it

### Step 3: Configure CORS (Most Common Issue!)
1. Go to Supabase Dashboard → **Settings** → **API**
2. Scroll down to **"Allowed Origins"** section
3. Click **"Add origin"**
4. Add your localhost URL: `http://localhost:5173` (or your actual dev server port)
5. Click **Save**
6. **Wait 1-2 minutes** for changes to propagate
7. Try again

### Step 4: Verify URL Format
- Should start with `https://`
- Should end with `.supabase.co`
- Example: `https://abcdefghijklmnop.supabase.co`
- **NO trailing slash** at the end

### Step 5: Check Browser Console
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Look for detailed error messages
4. Go to **Network** tab
5. Try login/signup again
6. Look for failed requests (red)
7. Click on failed request to see error details

## To Debug Login Issues

1. Open your browser's Developer Tools (F12)
2. Go to **Console** tab
3. Try logging in or signing up
4. Check the console for detailed error messages
5. Check the **Network** tab to see if requests are being made

## Common Issues & Fixes

- **"Failed to fetch"**: 
  - Missing or incorrect `.env` file
  - Dev server not restarted after creating `.env`
  - Supabase project is paused
  - Internet connection issue
  
- **"Invalid credentials"**: Make sure the user exists in Supabase
  
- **"Email confirmation required"**: Disable email confirmation in Auth settings
  
- **"Unauthorized"**: Check your `VITE_SUPABASE_ANON_KEY` is correct
  
- **"Missing environment variables"**: Ensure `.env` file exists with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Quick Checklist

- [ ] `.env` file created in root directory
- [ ] `VITE_SUPABASE_URL` set correctly
- [ ] `VITE_SUPABASE_ANON_KEY` set correctly
- [ ] Development server restarted after creating `.env`
- [ ] Email provider enabled in Supabase
- [ ] Site URL configured in Supabase
- [ ] Email confirmation disabled (for development)
