# ⚡ Quick CORS Search - 3 Most Likely Locations

## 🎯 Try These 3 Locations (In Order)

---

## 1️⃣ Settings → API (TRY THIS FIRST!)

**Steps:**
1. https://app.supabase.com → Your Project
2. Left sidebar → **Settings** (⚙️)
3. Click **API**
4. **Scroll ALL the way down**
5. Look for: "Allowed Origins", "CORS", "Additional Settings"

**What it looks like:**
- Text input field
- "Add origin" or "+" button
- List of URLs

---

## 2️⃣ Authentication → URL Configuration (TRY THIS SECOND!)

**Steps:**
1. https://app.supabase.com → Your Project
2. Left sidebar → **Authentication**
3. Look for **"URL Configuration"** or **"Site URL"**
4. Add: `http://localhost:5173`
5. Save

**What it looks like:**
- "Site URL" field
- "Redirect URLs" section
- "Additional URLs" section

---

## 3️⃣ Project Name → Settings (TRY THIS THIRD!)

**Steps:**
1. https://app.supabase.com
2. Click your **project name** (top left)
3. Look for **"Project Settings"** or **"Settings"**
4. Click **"API"** or **"Configuration"**
5. Look for CORS/Allowed Origins

---

## ⚡ Quick Test

**Can't find it? Try this:**

1. Go to **Authentication → URL Configuration**
2. Add `http://localhost:5173` to **Site URL**
3. Save
4. Wait 30 seconds
5. Test your app

**This might work even if it's not labeled "CORS"!**

---

## 🆘 Still Can't Find It?

**Search the page:**
- Press `Ctrl + F` (or `Cmd + F` on Mac)
- Search for: "CORS", "origin", "localhost", "URL"
- See where it appears

---

**Most likely: It's in Settings → API → Scroll down! 📍**

