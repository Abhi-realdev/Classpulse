# 🚨 QUICK FIX: CORS Error

## The Problem
You're seeing "Connection Error: Cannot reach Supabase" because your browser is blocking requests due to CORS (Cross-Origin Resource Sharing) policy.

## The Solution (2 minutes)

### Step 1: Open Supabase Dashboard
1. Go to: **https://app.supabase.com**
2. Sign in if needed
3. **Click on your project** (the one with URL: `cqmzzffidzeaqoxhjwlw.supabase.co`)

### Step 2: Navigate to API Settings
1. In the left sidebar, click **Settings** (⚙️ gear icon)
2. Click **API** in the settings menu

### Step 3: Add Your Localhost to Allowed Origins
1. Scroll down to find **"Allowed Origins"** section
2. You'll see a list or input field for origins
3. Click **"Add origin"** button (or the **+** icon)
4. Type exactly: `http://localhost:5173`
   - ⚠️ **Important**: 
     - Use `http://` (not `https://`)
     - Use the exact port your dev server is running on
     - Check your terminal where `npm run dev` is running to see the port
5. Click **Save** or press Enter

### Step 4: Wait and Refresh
1. **Wait 30-60 seconds** for changes to propagate
2. **Refresh your app page** (F5 or Ctrl+R)
3. The error should disappear
4. Try logging in/signing up again

## Still Not Working?

### Check Your Port Number
Your dev server might be running on a different port:
- Look at your terminal where `npm run dev` is running
- Find a line like: `Local: http://localhost:XXXX`
- Use that port number instead of 5173
- Add that exact URL to Supabase

### Verify Project Status
1. In Supabase Dashboard, check if your project shows **"Active"**
2. If it says **"Paused"**, click **"Resume"** button
3. Wait for it to become active

### Double-Check .env File
Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```
- ✅ No trailing slash after `.co`
- ✅ Starts with `https://`
- ✅ Restart dev server after any changes

### Check Browser Console
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Look for specific error messages
4. Go to **Network** tab
5. Try login/signup again
6. Look for failed requests (red)
7. Click on failed request to see error details

## Visual Guide

```
Supabase Dashboard
  └─ Your Project
      └─ Settings (⚙️)
          └─ API
              └─ Allowed Origins
                  └─ [Add origin] → http://localhost:5173
                      └─ [Save]
```

## Common Ports
- **Vite default**: `5173`
- **Create React App**: `3000`
- **Next.js**: `3000`
- **Custom**: Check your terminal output

## Need More Help?
- See `CORS_FIX.md` for detailed troubleshooting
- See `AUTH_SETUP.md` for complete setup guide
- Check browser console (F12) for specific errors

