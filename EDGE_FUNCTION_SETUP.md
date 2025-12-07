# ⚠️ Edge Function Setup (NOT RECOMMENDED for CORS)

## Important Warning

**Edge Functions will NOT fix your CORS issue with Supabase API!**

Your app uses `supabase.auth.signInWithPassword()` and `supabase.from('teachers')` which go directly to Supabase API. Edge Functions can't intercept these calls.

**The proper solution is to configure CORS in Supabase Dashboard.** See `FIND_CORS_NEW_UI.md` for help finding it in the new UI.

---

## If You Still Want to Use Edge Functions

If you absolutely cannot find CORS settings and want to use Edge Functions as a workaround, you'll need to:

1. **Change ALL your code** to call Edge Functions instead of Supabase directly
2. **Deploy the Edge Function**
3. **Update your app code** to use the Edge Function

**This is a lot of work and not recommended.**

---

## Setup Edge Functions (If You Must)

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

### Step 3: Link Your Project

```bash
supabase link --project-ref cqmzzffidzeaqoxhjwlw
```

### Step 4: Deploy the Function

```bash
supabase functions deploy cors-proxy
```

### Step 5: Set Environment Variables

In Supabase Dashboard:
1. Go to **Edge Functions** → **Settings**
2. Add environment variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_ANON_KEY`: Your anon key

---

## ⚠️ But This Won't Work!

Even if you deploy the Edge Function, your current code still calls Supabase API directly, which will still be blocked by CORS.

**You would need to rewrite your entire app** to use the Edge Function instead of direct Supabase calls.

---

## ✅ Better Solution: Find CORS in New UI

1. Check `FIND_CORS_NEW_UI.md` for where CORS might be in the new UI
2. Try different locations (Settings → API, Authentication → URL Configuration, etc.)
3. Look for "Allowed Origins", "CORS", or "Site URL" settings
4. Add `http://localhost:5173` there

---

## Summary

| Solution | Works? | Effort |
|----------|--------|--------|
| **Dashboard CORS Settings** | ✅ Yes | ⭐ Easy |
| **Edge Functions** | ❌ No (requires code rewrite) | ⭐⭐⭐⭐⭐ Very Hard |

**Recommendation:** Keep looking for CORS settings in the new Supabase UI. It's there somewhere!

