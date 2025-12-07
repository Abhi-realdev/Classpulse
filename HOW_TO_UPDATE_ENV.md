# 📝 How to Update Your .env File

## Your .env File Location

Your `.env` file is located in the **root directory** of your project:
```
C:\Users\HP\Documents\My Development\Classpulse\.env
```

## Current .env File Format

Your `.env` file should look exactly like this:

```env
VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co
VITE_SUPABASE_ANON_KEY=sb_secret_BRB72VArlgEbvdGm5OphFw_BTsfGHNa
```

## Where to Paste Your API Key

**Paste your API key after the `=` sign on the second line:**

```env
VITE_SUPABASE_URL=https://cqmzzffidzeaqoxhjwlw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnbWN4cWZ4cWJ3cGxtbXhwb2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU5OTcsImV4cCI6MjA4MDUxMTk5N30.hvT2mX2nhZBXKICrjK1SYitQr5-3ymKH6LOprZULeu8
```

### Step-by-Step:

1. **Open your `.env` file**
   - Navigate to: `C:\Users\HP\Documents\My Development\Classpulse\.env`
   - Open it with any text editor (Notepad, VS Code, etc.)

2. **Find the line with `VITE_SUPABASE_ANON_KEY=`**

3. **Replace the value after `=` with your API key**
   - Copy your API key from Supabase Dashboard
   - Paste it after the `=` sign
   - Make sure there are **NO spaces** around the `=` sign

4. **Save the file**

5. **Restart your dev server**
   - Stop the server (Ctrl+C in terminal)
   - Run `npm run dev` again

## Example:

**Before:**
```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnbWN4cWZ4cWJ3cGxtbXhwb2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU5OTcsImV4cCI6MjA4MDUxMTk5N30.hvT2mX2nhZBXKICrjK1SYitQr5-3ymKH6LOprZULeu8
```

**After (paste your new key):**
```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbXp6ZmZpZHplYXFveGhqd2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1Njg5MDAsImV4cCI6MjA1MDE0NDkwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Important Rules:

✅ **DO:**
- Put the key directly after `=` with no spaces
- Use the **anon/public** key (NOT service_role)
- Save the file after editing
- Restart dev server after changes

❌ **DON'T:**
- Add quotes around the key
- Add spaces around the `=` sign
- Use the service_role key
- Forget to restart the dev server

## Quick Edit Commands:

### Using VS Code:
1. Open VS Code in your project folder
2. Press `Ctrl+P` to open file search
3. Type `.env` and press Enter
4. Edit the file
5. Save (Ctrl+S)

### Using Notepad:
1. Right-click on `.env` file in File Explorer
2. Select "Open with" → "Notepad"
3. Edit the file
4. Save (Ctrl+S)

### Using Command Line:
```powershell
# Open .env in Notepad
notepad .env

# Or in VS Code
code .env
```

## Verify It's Working:

After updating and restarting, check your browser console (F12):
- You should see: `Supabase URL: https://cqmzzffidzeaqoxhjwlw...`
- You should see: `Supabase Key configured: true`

If you see errors, double-check:
1. No spaces around `=`
2. No quotes around the key
3. You restarted the dev server
4. The key is the **anon** key (not service_role)

