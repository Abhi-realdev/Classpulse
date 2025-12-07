# 🔧 CORS Fix - Step-by-Step Guide

## ⚠️ You're Getting: "Connection Error: Cannot reach Supabase"

This is a CORS (Cross-Origin Resource Sharing) issue. Follow these steps **exactly**:

---

## 📋 Step-by-Step Fix

### Step 1: Open Supabase Dashboard
1. Go to: **https://app.supabase.com**
2. **Sign in** if needed
3. You should see your projects list

### Step 2: Select Your Project
1. **Click on your project** (the one with URL: `cqmzzffidzeaqoxhjwlw.supabase.co`)
2. Wait for the dashboard to load

### Step 3: Navigate to API Settings
1. In the **left sidebar**, look for **Settings** (⚙️ gear icon)
   - It's usually near the bottom of the sidebar
2. **Click on Settings**
3. In the settings menu, click **API**
   - You should see "Project URL", "API keys", etc.

### Step 4: Find "Allowed Origins" Section
1. **Scroll down** on the API settings page
2. Look for a section called **"Allowed Origins"** or **"CORS Origins"**
   - It might be under "Additional Settings" or "Security"
   - It's usually below the API keys section

### Step 5: Add Your Localhost Origin
1. Look for an **"Add origin"** button or **"+"** icon
2. **Click it**
3. A text input field will appear
4. **Type exactly:** `http://localhost:5173`
   - ⚠️ **Important:**
     - Use `http://` (NOT `https://`)
     - Use `localhost` (NOT `127.0.0.1`)
     - Use the exact port your dev server is running on
     - Check your terminal where `npm run dev` is running to see the port
5. **Press Enter** or click outside the field

### Step 6: Save Changes
1. Look for a **"Save"** button
2. **Click it**
3. You might see a confirmation message

### Step 7: Wait for Propagation
1. **Wait 30-60 seconds** (changes need time to propagate)
2. Don't refresh immediately - give it time

### Step 8: Verify It's Added
1. **Scroll back** to the "Allowed Origins" section
2. You should see `http://localhost:5173` in the list
3. If you don't see it, try adding it again

### Step 9: Refresh Your App
1. Go back to your app: `http://localhost:5173`
2. **Hard refresh** the page:
   - Windows: `Ctrl + Shift + R` or `Ctrl + F5`
   - Or close and reopen the browser tab
3. Try signing up/login again

---

## 🔍 Verify Your Dev Server Port

**Important:** Make sure you're using the correct port!

1. Look at your terminal where `npm run dev` is running
2. Find a line like:
   ```
   Local:   http://localhost:5173/
   ```
3. **Use that exact port number** in Supabase
4. If it says a different port (like 3000, 5174, etc.), use that instead

---

## 🐛 Troubleshooting

### Issue: Can't Find "Allowed Origins" Section

**Solution:**
- It might be in a different location depending on Supabase version
- Try looking under:
  - **Settings** → **API** → Scroll down
  - **Settings** → **Security** → **CORS**
  - **Project Settings** → **API** → **CORS Origins**

### Issue: "Add origin" Button Not Working

**Solution:**
- Try refreshing the Supabase dashboard page
- Make sure you're in the correct project
- Try using a different browser
- Check if you have the correct permissions

### Issue: Still Getting CORS Error After Adding

**Checklist:**
1. ✅ Did you wait 30-60 seconds after saving?
2. ✅ Did you hard refresh your app page (Ctrl+Shift+R)?
3. ✅ Is your dev server running on the exact port you added?
4. ✅ Did you restart your dev server after any `.env` changes?
5. ✅ Is your Supabase project **active** (not paused)?

### Issue: Port Mismatch

**Check:**
- Your terminal shows: `http://localhost:5173`
- But you added: `http://localhost:3000` to Supabase
- **Fix:** Add the correct port to Supabase

### Issue: Project is Paused

**Check:**
1. In Supabase Dashboard, look at the top
2. If you see "Project Paused" or "Resume Project"
3. **Click "Resume"** to activate it
4. Wait for it to become active
5. Try again

---

## ✅ Quick Verification

### Test 1: Check Browser Console
1. Open your app: `http://localhost:5173`
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for:
   - ✅ `Supabase URL: https://cqmzzffidzeaqoxhjwlw...` (should show)
   - ✅ `Supabase Key configured: true` (should show)
   - ❌ Any red errors about CORS or "Failed to fetch"

### Test 2: Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try to sign up/login
4. Look for failed requests (red)
5. Click on a failed request
6. Check the error message:
   - If it says "CORS" → CORS not configured
   - If it says "Failed to fetch" → Could be CORS or network issue

---

## 🔄 Alternative: Add Multiple Ports

If you're not sure which port you're using, add both common ports:

1. Add: `http://localhost:5173` (Vite default)
2. Add: `http://localhost:3000` (common alternative)
3. Add: `http://localhost:5174` (if 5173 is taken)

---

## 📝 Visual Guide

```
Supabase Dashboard
  └─ Your Project
      └─ Settings (⚙️) [Left Sidebar]
          └─ API
              └─ Scroll Down
                  └─ "Allowed Origins" Section
                      └─ [Add origin] button
                          └─ Type: http://localhost:5173
                              └─ [Save]
                                  └─ Wait 30-60 seconds
                                      └─ Refresh app
```

---

## 🚨 Still Not Working?

### Last Resort Steps:

1. **Double-check .env file:**
   ```env
   VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co
   VITE_SUPABASE_ANON_KEY=your-key-here
   ```
   - No trailing slash after `.co`
   - No spaces around `=`
   - Restart dev server after any changes

2. **Clear Browser Cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear cached images and files
   - Try again

3. **Try Incognito/Private Mode:**
   - Open browser in incognito/private mode
   - Go to `http://localhost:5173`
   - Try again

4. **Check Supabase Project Status:**
   - Make sure project is **Active** (not paused)
   - Check project is not over quota
   - Verify you have the correct project selected

5. **Contact Support:**
   - If nothing works, check Supabase status page
   - Or check browser console for specific error messages

---

## ✅ Success Indicators

You'll know CORS is fixed when:
- ✅ No more "Connection Error" messages
- ✅ Can sign up successfully
- ✅ Can sign in successfully
- ✅ No CORS errors in browser console
- ✅ Network requests succeed (green in Network tab)

---

**Remember:** After adding CORS origin, **wait 30-60 seconds** before testing!

