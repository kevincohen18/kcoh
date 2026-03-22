#!/usr/bin/env node

/**
 * Version Bumper Script
 * Automatically updates version numbers across all files
 *
 * Usage:
 *   node bump-version.js         # Bump patch version (3.4.0 -> 3.4.1)
 *   node bump-version.js minor   # Bump minor version (3.4.0 -> 3.5.0)
 *   node bump-version.js major   # Bump major version (3.4.0 -> 4.0.0)
 */

const fs = require('fs');
const path = require('path');

const versionType = process.argv[2] || 'patch'; // patch, minor, or major

// Files to update
const filesToUpdate = [
    'package.json',
    'version.json',
    'sw.js',
    'cache-buster.js',
    'index.html',
    'about.html',
    'services.html',
    'portfolio.html',
    'contact.html',
    'sitemap.html',
    '404.html',
    'styles.css',
    'quick-wins.css',
    'terminal.js',
    'assets/js/404-search.js'
];

// Read current version from package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version;

// Parse version
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Calculate new version
let newVersion;
switch (versionType) {
    case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
    case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
    case 'patch':
    default:
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
}

console.log(`🔄 Bumping version: ${currentVersion} → ${newVersion}`);

// Update files
let filesUpdated = 0;

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${file} (not found)`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace version strings
        const oldPattern1 = new RegExp(`\\?v=${currentVersion.replace(/\./g, '\\.')}`, 'g');
        const oldPattern2 = new RegExp(`"version":\\s*"${currentVersion.replace(/\./g, '\\.')}"`, 'g');
        const oldPattern3 = new RegExp(`CURRENT_VERSION\\s*=\\s*'${currentVersion.replace(/\./g, '\\.')}'`, 'g');
        const oldPattern4 = new RegExp(`CACHE_VERSION\\s*=\\s*'v${currentVersion.replace(/\./g, '\\.')}'`, 'g');

        content = content.replace(oldPattern1, `?v=${newVersion}`);
        content = content.replace(oldPattern2, `"version": "${newVersion}"`);
        content = content.replace(oldPattern3, `CURRENT_VERSION = '${newVersion}'`);
        content = content.replace(oldPattern4, `CACHE_VERSION = 'v${newVersion}'`);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${file}`);
        filesUpdated++;
    } catch (error) {
        console.log(`❌ Error updating ${file}:`, error.message);
    }
});

// Update version.json timestamp
try {
    const versionJson = JSON.parse(fs.readFileSync('version.json', 'utf8'));
    versionJson.version = newVersion;
    versionJson.timestamp = new Date().toISOString();
    fs.writeFileSync('version.json', JSON.stringify(versionJson, null, 2), 'utf8');
    console.log(`✅ Updated version.json timestamp`);
} catch (error) {
    console.log(`❌ Error updating version.json:`, error.message);
}

console.log(`\n✨ Version bump complete!`);
console.log(`📦 Files updated: ${filesUpdated}`);
console.log(`🎯 New version: ${newVersion}`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Test your changes`);
console.log(`   2. Commit: git add . && git commit -m "Bump version to ${newVersion}"`);
console.log(`   3. Deploy your site`);
