# 🚀 Quick Start: Automatic Cache Busting

## ✨ What This Solves

**Problem:** Users see old cached versions of your website even after you deploy updates.

**Solution:** Automatic cache busting that forces browsers to load the latest version!

## 📦 What Was Added

1. ✅ **Service Worker** (`sw.js`) - Automatically manages cache
2. ✅ **Cache Buster Script** (`cache-buster.js`) - Detects updates and notifies users
3. ✅ **Version Bump Script** (`bump-version.js`) - Auto-updates version numbers
4. ✅ **Version Tracker** (`version.json`) - Tracks current version

## 🎯 How to Use (3 Simple Steps)

### Step 1: Add Cache Buster to Your HTML

Add this line to the `<head>` section of **index.html** (and optionally other pages):

```html
<head>
    <!-- Your existing meta tags and stylesheets... -->

    <!-- ADD THIS LINE before closing </head> -->
    <script src="cache-buster.js" defer></script>
</head>
```

### Step 2: When You Make Changes

After editing any files (HTML, CSS, JS), run:

```bash
# Option A: Use npm scripts
npm run version:patch

# Option B: Run script directly
node bump-version.js
```

This automatically updates version from `3.4.0` to `3.4.1` in ALL files!

### Step 3: Deploy

Upload all files to your server. That's it!

## 🎬 How It Works for Users

1. **User visits your site** → Sees current version
2. **You make changes** → Run `npm run version:patch`
3. **You deploy updates** → Upload to server
4. **User refreshes** → Sees notification: "Update Available!"
5. **User clicks "Refresh Now"** → Gets latest version ✅

## 💡 Common Commands

```bash
# After fixing a bug (3.4.0 → 3.4.1)
npm run version:patch

# After adding a feature (3.4.0 → 3.5.0)
npm run version:minor

# After major redesign (3.4.0 → 4.0.0)
npm run version:major

# Check current version
cat version.json
```

## 📱 What Users See

When a new version is available, users see a beautiful notification:

```
┌─────────────────────────────┐
│ 🌐 Update Available!         │
│ A new version is ready       │
│                              │
│ [ Refresh Now ]              │
└─────────────────────────────┘
```

- Appears in top-right corner
- Purple gradient (matches your theme)
- One-click refresh
- Can be dismissed

## ✅ Complete Workflow Example

```bash
# 1. Make your changes
vim script.js  # Fix chatbot bug

# 2. Bump version
npm run version:patch

# Output:
# 🔄 Bumping version: 3.4.0 → 3.4.1
# ✅ Updated package.json
# ✅ Updated version.json
# ✅ Updated sw.js
# ✅ Updated cache-buster.js
# ✅ Updated index.html
# ✨ Version bump complete!

# 3. Commit
git add .
git commit -m "Fix chatbot bug (v3.4.1)"

# 4. Deploy
git push
# (or upload via FTP)
```

## 🔍 What Gets Updated

When you run `npm run version:patch`, the script updates:

- ✅ `package.json` → `"version": "3.4.1"`
- ✅ `version.json` → `"version": "3.4.1"`
- ✅ `sw.js` → `CACHE_VERSION = 'v3.4.1'`
- ✅ `cache-buster.js` → `CURRENT_VERSION = '3.4.1'`
- ✅ ALL HTML files → `styles.css?v=3.4.1`

## 🎨 Customization

### Change Update Check Frequency

Default: Checks every 5 minutes

To change, edit `cache-buster.js`:

```javascript
// Check every 1 minute (60000 ms)
setInterval(checkForUpdates, 60000);

// Check every 10 minutes (600000 ms)
setInterval(checkForUpdates, 600000);
```

### Auto-Refresh Without Notification

Edit `cache-buster.js` and replace `showUpdateNotification()` with:

```javascript
location.reload(true);
```

## 📚 Files Added

| File | Purpose |
|------|---------|
| `sw.js` | Service worker for cache management |
| `cache-buster.js` | Detects updates and shows notification |
| `bump-version.js` | Auto-updates version numbers |
| `version.json` | Tracks current version |
| `CACHE_BUSTING_GUIDE.md` | Full documentation |

## ⚡ Quick Tips

- ✅ Always bump version after changes
- ✅ Test locally before deploying
- ✅ Deploy ALL files together
- ✅ Check version.json was uploaded
- ✅ Clear your own cache to test

## 🆘 Troubleshooting

### Users still see old version?

```bash
# Bump version again
npm run version:patch

# Check version.json exists on server
curl https://yoursite.com/version.json
```

### Script not working?

```bash
# Make sure Node.js is installed
node --version

# Re-run version bump
npm run version:patch
```

## 🎉 Benefits

1. ✅ Users automatically see latest version
2. ✅ No manual cache clearing needed
3. ✅ Professional update notifications
4. ✅ One command updates everything
5. ✅ Works on all browsers
6. ✅ Mobile-friendly

## 📖 Need More Details?

Read the full guide: `CACHE_BUSTING_GUIDE.md`

---

**That's it! Your cache busting system is ready to go! 🚀**

**Copyright © 2025 KCOH Software Inc. All Rights Reserved.**
