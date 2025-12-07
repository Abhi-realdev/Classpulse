# ✅ Disable Email Confirmation in Supabase

## 🎯 Quick Fix for "Invalid email or password" After Signup

If you can sign up but can't log in, it's usually because **email confirmation is required**. Here's how to disable it:

---

## Step-by-Step: Disable Email Confirmation

### Step 1: Open Supabase Dashboard
1. Go to: **https://app.supabase.com**
2. **Sign in** if needed
3. **Select your project** (`cqmzzffidzeaqoxhjwlw`)

### Step 2: Navigate to Authentication Settings
1. In the **left sidebar**, click **Authentication**
2. Look for **"Settings"** or **"Configuration"** tab
   - It might be at the top of the Authentication page
   - Or in a submenu

### Step 3: Find Email Confirmation Setting
1. **Scroll down** the settings page
2. Look for:
   - **"Confirm email"** toggle/checkbox
   - **"Email confirmation"** setting
   - **"Require email confirmation"** option
   - **"Enable email confirmations"** toggle

### Step 4: Disable It
1. **Turn OFF** the email confirmation toggle/checkbox
2. **Click "Save"** or the save button
3. Wait for confirmation that it's saved

### Step 5: Test
1. **Go back to your app**
2. **Sign up with a NEW account** (or use existing)
3. **Try logging in immediately**
4. **Should work now!**

---

## Alternative Locations (If Not in Authentication → Settings)

### Location 1: Authentication → Providers → Email
1. **Authentication** → **Providers**
2. Click on **"Email"** provider
3. Look for email confirmation settings there

### Location 2: Project Settings → Authentication
1. **Settings** (gear icon) → **Authentication**
2. Look for email confirmation settings

### Location 3: Authentication → Configuration
1. **Authentication** → **Configuration**
2. Look for email settings

---

## Visual Guide

```
Supabase Dashboard
  └─ Your Project
      └─ Authentication (left sidebar)
          └─ Settings (or Configuration tab)
              └─ Scroll down
                  └─ "Confirm email" toggle
                      └─ Turn OFF
                          └─ Save
```

---

## ✅ After Disabling

1. **New signups** will be able to log in immediately
2. **Existing unconfirmed users** can now log in
3. **No email confirmation needed**

---

## 🔍 Verify It's Disabled

1. **Go to Authentication → Settings**
2. **Check that "Confirm email" is OFF** (gray/unchecked)
3. **If it's still ON, try toggling it off and saving again**

---

## 🎯 Why This Fixes It

When email confirmation is enabled:
- ✅ Signup creates the account
- ❌ But account is "unconfirmed"
- ❌ Login is rejected until email is confirmed
- ❌ You get "Invalid email or password" error

When email confirmation is disabled:
- ✅ Signup creates the account
- ✅ Account is immediately "confirmed"
- ✅ You can log in right away
- ✅ No email needed

---

## ⚠️ Important Notes

- **For development:** Disable email confirmation (easier testing)
- **For production:** You might want to enable it (better security)
- **After disabling:** Existing unconfirmed users can now log in
- **No need to confirm emails** after disabling

---

**This should fix your login issue! After disabling, try signing up and logging in again. 🎯**

