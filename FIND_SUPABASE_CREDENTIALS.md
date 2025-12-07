# 📍 Where to Find Your Supabase URL and API Key

## Quick Answer

Your Supabase URL is: **`https://cqmzzffidzeaqoxhjwlw.supabase.co`**

You already have it! But here's where to find it (and your API key) in the Supabase Dashboard:

---

## Step-by-Step Guide

### Step 1: Open Supabase Dashboard
1. Go to: **https://app.supabase.com**
2. Sign in with your account

### Step 2: Select Your Project
1. You'll see a list of your projects
2. Click on the project you want to use
   - Your project URL shows: `cqmzzffidzeaqoxhjwlw.supabase.co`
   - So click on that project

### Step 3: Go to Settings → API
1. In the **left sidebar**, look for **Settings** (⚙️ gear icon)
2. Click on **Settings**
3. In the settings menu, click **API**

### Step 4: Find Your Credentials

You'll see a page with several sections:

#### 📍 **Project URL** (This is your `VITE_SUPABASE_URL`)
- Look for a section labeled **"Project URL"** or **"API URL"**
- It will show: `https://cqmzzffidzeaqoxhjwlw.supabase.co`
- **Copy this entire URL** (including `https://` and `.supabase.co`)
- This goes in your `.env` file as: `VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co`

#### 🔑 **Project API keys** (This is your `VITE_SUPABASE_ANON_KEY`)
- Scroll down to find **"Project API keys"** section
- You'll see two keys:
  - **`anon` public** ← **USE THIS ONE**
  - **`service_role`** ← DO NOT USE THIS (it's secret!)
- Click the **eye icon** 👁️ or **copy button** next to the **`anon` public** key
- Copy the entire key (it's very long, starts with `eyJhbGc...`)
- This goes in your `.env` file as: `VITE_SUPABASE_ANON_KEY=eyJhbGc...`

---

## Visual Guide

```
┌─────────────────────────────────────┐
│  Supabase Dashboard                 │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Your Projects                 │  │
│  │                               │  │
│  │  📁 cqmzzffidzeaqoxhjwlw     │  │ ← Click here
│  │     (or your project name)    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  Project Dashboard                  │
│                                     │
│  Left Sidebar:                      │
│  ├─ 🏠 Home                        │
│  ├─ 📊 Table Editor                │
│  ├─ 🔐 Authentication              │
│  ├─ ⚙️ Settings ← Click here      │
│  └─ ...                            │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  Settings Menu                      │
│                                     │
│  ├─ General                         │
│  ├─ API ← Click here                │
│  ├─ Database                       │
│  └─ ...                            │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│  API Settings Page                  │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Project URL                    │ │
│  │ https://cqmzzffidzeaqoxhjwlw   │ │ ← Copy this
│  │     .supabase.co               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Project API keys               │ │
│  │                                │ │
│  │ anon public                    │ │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6...│ │ ← Copy this
│  │ [👁️] [📋]                      │ │
│  │                                │ │
│  │ service_role (secret)          │ │
│  │ [👁️] [📋]                      │ │ ← DON'T copy this
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Your .env File Should Look Like:

```env
VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbXp6ZmZpZHplYXFveGhqd2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1Njg5MDAsImV4cCI6MjA1MDE0NDkwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important Notes:**
- ✅ No spaces around the `=` sign
- ✅ No quotes needed around the values
- ✅ No trailing slash after `.co`
- ✅ Use the **anon** key, NOT the service_role key

---

## Quick Links

- **Supabase Dashboard**: https://app.supabase.com
- **Direct link to API Settings**: https://app.supabase.com/project/_/settings/api
  - (Replace `_` with your project ID if needed)

---

## Still Can't Find It?

1. **Make sure you're signed in** to Supabase
2. **Check you're in the correct project** (the one with URL `cqmzzffidzeaqoxhjwlw`)
3. **Look for "Settings" in the left sidebar** (it's usually at the bottom)
4. **The API page shows both URL and keys** - scroll down if needed

If you still can't find it, the URL you already have (`https://cqmzzffidzeaqoxhjwlw.supabase.co`) is correct! You just need to find the API key in the same place.

