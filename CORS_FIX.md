# Quick CORS Fix Guide

## ⚠️ If you see "Cannot connect to Supabase" error:

### Step-by-Step CORS Configuration:

1. **Open Supabase Dashboard**
   - Go to: https://app.supabase.com
   - Sign in if needed

2. **Select Your Project**
   - Click on your project from the list

3. **Navigate to API Settings**
   - Click **Settings** (gear icon) in the left sidebar
   - Click **API** in the settings menu

4. **Add Your Localhost Origin**
   - Scroll down to find **"Allowed Origins"** section
   - Click the **"Add origin"** button (or "+" icon)
   - Enter: `http://localhost:5173`
     - ⚠️ **Important**: Use the exact port your dev server is running on
     - Check your terminal where `npm run dev` is running to see the port
   - Click **Save** or press Enter

5. **Wait for Propagation**
   - Changes can take 30-60 seconds to propagate
   - Wait a moment, then refresh your app

6. **Verify**
   - The connection error should disappear
   - Try logging in/signing up again

## Alternative: Check Your Dev Server Port

If your dev server is running on a different port:

1. Check your terminal where `npm run dev` is running
2. Look for a line like: `Local: http://localhost:XXXX`
3. Use that port number instead of 5173
4. Add that exact URL to Supabase Allowed Origins

## Still Not Working?

1. **Verify Project Status**
   - In Supabase Dashboard, check if project shows "Active"
   - If paused, click "Resume"

2. **Check .env File**
   - Location: Root folder of your project (same folder as `package.json`)
   - File name: `.env` (starts with a dot)
   - Make sure `VITE_SUPABASE_URL` has no trailing slash
   - Example: `https://abc123.supabase.co` ✅
   - NOT: `https://abc123.supabase.co/` ❌
   - Format should be:
     ```env
     VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co
     VITE_SUPABASE_ANON_KEY=your-api-key-here
     ```
   - **Where to paste API key**: After `=` on the `VITE_SUPABASE_ANON_KEY` line
   - See `HOW_TO_UPDATE_ENV.md` for detailed instructions

3. **Restart Dev Server**
   - Stop server (Ctrl+C)
   - Run `npm run dev` again

4. **Check Browser Console**
   - Open DevTools (F12)
   - Look for specific CORS error messages
   - Check Network tab for failed requests

## Common Ports:
- Vite default: `5173`
- Create React App: `3000`
- Next.js: `3000`
- Custom: Check your terminal output

