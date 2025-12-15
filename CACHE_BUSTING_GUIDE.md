# Cache Busting Guide

## 🎯 Problem: Users See Old Cached Versions

When you update your website, users' browsers may show old cached versions instead of the latest content. This guide explains how to solve this automatically.

## ✅ Solutions Implemented

### 1. **Service Worker** (`sw.js`)

**What it does:**
- Automatically detects when new files are available
- Clears old cached files
- Serves fresh content to users

**How it works:**
- Runs in the background
- Checks for updates every 60 seconds
- Deletes old cache versions automatically
- Uses network-first strategy (always try to get fresh content)

### 2. **Cache Buster Script** (`cache-buster.js`)

**What it does:**
- Checks for version updates
- Shows notification when new version is available
- Allows users to refresh with one click

**How it works:**
- Compares current version with `version.json`
- Checks every 5 minutes for updates
- Stores version in localStorage
- Shows update notification banner

### 3. **Version Bumping Script** (`bump-version.js`)

**What it does:**
- Automatically updates version numbers across all files
- Updates query strings (`?v=3.4.0` → `?v=3.4.1`)
- Updates version in package.json, version.json, and HTML files

**How to use:**
```bash
# Bump patch version (3.4.0 -> 3.4.1)
node bump-version.js

# Bump minor version (3.4.0 -> 3.5.0)
node bump-version.js minor

# Bump major version (3.4.0 -> 4.0.0)
node bump-version.js major
```

## 🚀 How to Use

### When You Make Changes:

1. **Make your edits** to HTML, CSS, or JavaScript files

2. **Bump the version:**
   ```bash
   node bump-version.js
   ```
   This automatically:
   - Updates `?v=3.4.0` to `?v=3.4.1` in all HTML files
   - Updates version in package.json
   - Updates version in sw.js
   - Updates version in cache-buster.js
   - Updates timestamp in version.json

3. **Deploy your site** to your server

4. **Users automatically get updates:**
   - Service worker detects new version
   - Cache buster shows "Update Available" notification
   - Users click "Refresh Now" → see latest version

## 📋 Adding to Your HTML

### Option 1: Add to index.html (Recommended)

Add these lines to the `<head>` section of your HTML:

```html
<head>
    <!-- Existing meta tags... -->

    <!-- Cache Control -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    <!-- Existing stylesheets with version strings... -->
    <link rel="stylesheet" href="styles.css?v=3.4.0">
    <link rel="stylesheet" href="quick-wins.css?v=3.4.0">

    <!-- At the end of <head>, before closing </head> -->
    <script src="cache-buster.js" defer></script>
</head>
```

### Option 2: Full Implementation

For the most aggressive cache busting, add cache-buster.js to ALL pages:

**In index.html, about.html, services.html, portfolio.html, contact.html:**

```html
<head>
    <!-- Cache Control Meta Tags -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    <!-- Your existing content... -->

    <!-- Cache Buster Script (before closing </head>) -->
    <script src="cache-buster.js" defer></script>
</head>
```

## 🔄 Workflow Example

### Scenario: You update the chatbot

1. **Edit** `script.js` to fix a bug in the chatbot

2. **Bump version:**
   ```bash
   node bump-version.js
   ```
   Output:
   ```
   🔄 Bumping version: 3.4.0 → 3.4.1
   ✅ Updated package.json
   ✅ Updated version.json
   ✅ Updated sw.js
   ✅ Updated cache-buster.js
   ✅ Updated index.html
   ✅ Updated about.html
   ✅ Updated services.html
   ✅ Updated portfolio.html
   ✅ Updated contact.html

   ✨ Version bump complete!
   🎯 New version: 3.4.1
   ```

3. **Commit and deploy:**
   ```bash
   git add .
   git commit -m "Fix chatbot bug (v3.4.1)"
   git push
   ```

4. **Users see update:**
   - Service worker detects new files
   - Banner appears: "Update Available!"
   - User clicks "Refresh Now"
   - Chatbot bug is fixed ✅

## 📊 Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH** (e.g., `3.4.1`)

### When to bump which version:

| Change Type | Version | Command | Example |
|-------------|---------|---------|---------|
| Bug fix | Patch | `node bump-version.js` | 3.4.0 → 3.4.1 |
| New feature | Minor | `node bump-version.js minor` | 3.4.0 → 3.5.0 |
| Breaking change | Major | `node bump-version.js major` | 3.4.0 → 4.0.0 |

### Examples:

```bash
# Fixed a typo → patch
node bump-version.js

# Added new chat feature → minor
node bump-version.js minor

# Complete redesign → major
node bump-version.js major
```

## 🛠️ How It Works Together

```
┌─────────────────┐
│ Make Changes    │
│ to website      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Run             │
│ bump-version.js │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│ Updates version in:         │
│ • package.json              │
│ • version.json              │
│ • sw.js                     │
│ • cache-buster.js           │
│ • All HTML files            │
│   (script.js?v=NEW_VERSION) │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────┐
│ Deploy          │
│ to server       │
└────────┬────────┘
         │
         ▼
┌──────────────────────────────┐
│ User visits site             │
├──────────────────────────────┤
│ 1. cache-buster.js loads     │
│ 2. Checks version.json       │
│ 3. Sees NEW_VERSION          │
│ 4. Shows update notification │
│ 5. User clicks refresh       │
│ 6. Service worker clears     │
│    old cache                 │
│ 7. Fresh files load          │
└──────────────────────────────┘
```

## 🎨 Update Notification

When a new version is detected, users see:

```
┌─────────────────────────────┐
│ 🌐 Update Available!         │
│ A new version is ready       │
│                              │
│ [ Refresh Now ]              │
└─────────────────────────────┘
```

- Appears in top-right corner
- Purple gradient background
- Dismiss button (X)
- One-click refresh

## 🔧 Customization

### Change Update Check Frequency

Edit `cache-buster.js`:

```javascript
// Check every 5 minutes (default)
setInterval(checkForUpdates, 300000);

// Change to check every minute
setInterval(checkForUpdates, 60000);

// Change to check every 10 minutes
setInterval(checkForUpdates, 600000);
```

### Disable Update Notification

If you want silent updates without notification:

```javascript
// Comment out this line in cache-buster.js
// showUpdateNotification();
```

### Auto-refresh (No Notification)

For automatic refresh without user interaction:

```javascript
// Replace showUpdateNotification() with:
location.reload(true);
```

## ⚡ Quick Commands

```bash
# Update patch version (most common)
node bump-version.js

# Update minor version (new features)
node bump-version.js minor

# Update major version (big changes)
node bump-version.js major

# Check current version
cat version.json
```

## 📝 Best Practices

1. ✅ **Always bump version after changes**
2. ✅ **Test locally before deploying**
3. ✅ **Commit version bump with descriptive message**
4. ✅ **Update version.json changes array**
5. ✅ **Deploy all files together** (don't forget version.json!)

## 🚨 Troubleshooting

### Users still see old version

**Solution 1:** Force cache clear
```javascript
// Add to cache-buster.js
if (caches) {
    caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
    });
}
location.reload(true);
```

**Solution 2:** Bump version again
```bash
node bump-version.js
```

### Service worker not updating

**Solution:** Unregister and re-register
```javascript
navigator.serviceWorker.getRegistrations()
    .then(registrations => {
        registrations.forEach(r => r.unregister());
    })
    .then(() => location.reload(true));
```

### Version bump script errors

**Check:**
- Node.js is installed: `node --version`
- You're in the correct directory
- Files exist and are readable

## 📚 Additional Resources

- [MDN: Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Semantic Versioning](https://semver.org/)
- [Cache Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

---

**Copyright © 2025 KCOH Software Inc. All Rights Reserved.**
