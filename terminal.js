/**
 * Copyright © 2026 KCOH Software Inc. All Rights Reserved.
 *
 * This software and associated documentation files (the "Software")
 * are proprietary and confidential. Unauthorized copying, modification,
 * distribution, or use of this Software, via any medium, is strictly prohibited.
 *
 * For licensing inquiries, contact: inquiries@kcoh.ca
 */

// ============================================
// INTERACTIVE TERMINAL SYSTEM
// ============================================

// Virtual File System
const fileSystem = {
    '~': {
        type: 'directory',
        path: '~',
        children: {
            'projects': {
                type: 'directory',
                path: '~/projects',
                description: 'Project directories',
                children: {
                    'ios-apps': {
                        type: 'directory',
                        path: '~/projects/ios-apps',
                        description: '10+ published iOS applications',
                        children: {
                            'README.md': {
                                type: 'file',
                                path: '~/projects/ios-apps/README.md',
                                content: `# iOS Applications

A collection of 10+ iOS applications published on the App Store.

## Technologies
- Swift
- SwiftUI
- UIKit
- Core Data
- Combine

## Highlights
- Native iOS performance
- Modern UI/UX design
- App Store approved
- Regular updates and maintenance

Visit https://kevincohen.ca for full portfolio.`,
                                size: 1024
                            },
                            'app1': {
                                type: 'directory',
                                path: '~/projects/ios-apps/app1',
                                description: 'iOS App #1',
                                children: {}
                            }
                        }
                    },
                    'web-apps': {
                        type: 'directory',
                        path: '~/projects/web-apps',
                        description: 'Full-stack React & Node.js projects',
                        children: {
                            'README.md': {
                                type: 'file',
                                path: '~/projects/web-apps/README.md',
                                content: `# Web Applications

Full-stack web applications built with modern technologies.

## Stack
- React / Vue.js / Angular
- Node.js / Express
- PostgreSQL / MongoDB
- AWS / Docker

## Features
- Responsive design
- Real-time updates
- RESTful APIs
- Cloud deployment

Visit https://kevincohen.ca for details.`,
                                size: 2048
                            }
                        }
                    },
                    'api-services': {
                        type: 'directory',
                        path: '~/projects/api-services',
                        description: 'RESTful & GraphQL APIs',
                        children: {
                            'README.md': {
                                type: 'file',
                                path: '~/projects/api-services/README.md',
                                content: `# API Services

RESTful and GraphQL API implementations.

## Technologies
- Node.js / Express
- GraphQL / Apollo
- PostgreSQL / MongoDB
- Redis
- AWS Lambda

## Features
- RESTful endpoints
- GraphQL queries
- Authentication & authorization
- Rate limiting
- Documentation

Visit https://kevincohen.ca for API documentation.`,
                                size: 1536
                            }
                        }
                    },
                    'cloud-infrastructure': {
                        type: 'directory',
                        path: '~/projects/cloud-infrastructure',
                        description: 'AWS, Docker, Kubernetes deployments',
                        children: {
                            'README.md': {
                                type: 'file',
                                path: '~/projects/cloud-infrastructure/README.md',
                                content: `# Cloud Infrastructure

Cloud deployment and infrastructure as code.

## Technologies
- AWS (EC2, S3, Lambda, RDS)
- Docker & Docker Compose
- Kubernetes
- Terraform
- CI/CD pipelines

## Features
- Scalable architecture
- Auto-scaling
- Load balancing
- Monitoring & logging
- Disaster recovery

Visit https://kevincohen.ca for infrastructure details.`,
                                size: 2048
                            }
                        }
                    },
                    'README.md': {
                        type: 'file',
                        path: '~/projects/README.md',
                        content: `# Projects Portfolio

Welcome to my projects directory!

## Available Projects

- **ios-apps/** - 10+ published iOS applications
- **web-apps/** - Full-stack React & Node.js projects
- **api-services/** - RESTful & GraphQL APIs
- **cloud-infrastructure/** - AWS, Docker, Kubernetes deployments

## Navigation

Use \`cd <directory>\` to explore projects.
Use \`cat README.md\` to view project details.
Use \`ls\` to list files and directories.

Visit https://kevincohen.ca for the complete portfolio.`,
                        size: 1024
                    }
                }
            }
        }
    }
};

// Terminal State
let terminalState = {
    currentPath: '~/projects',
    history: [],
    historyIndex: -1,
    previousPath: '~/projects'
};

// Command Aliases
const aliases = {
    'll': 'ls -la',
    '..': 'cd ..',
    '~': 'cd ~',
    '?': 'help',
    'cls': 'clear',
    'cosway': 'cowsay'  // Common typo for cowsay
};

// Achievement unlock function
function unlockTerminalAchievement() {
    // Wait for achievement system to be available
    setTimeout(() => {
        if (typeof unlockAchievement === 'function') {
            unlockAchievement({
                icon: '💻',
                text: 'Terminal Hacker',
                description: 'Discovered the interactive terminal!'
            });
        } else {
            // Fallback if achievement system not loaded yet
            const checkInterval = setInterval(() => {
                if (typeof unlockAchievement === 'function') {
                    clearInterval(checkInterval);
                    unlockAchievement({
                        icon: '💻',
                        text: 'Terminal Hacker',
                        description: 'Discovered the interactive terminal!'
                    });
                }
            }, 100);
            // Stop checking after 5 seconds
            setTimeout(() => clearInterval(checkInterval), 5000);
        }
    }, 100);
}

// Initialize Interactive Terminal
function initInteractiveTerminalPortfolio() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalPrompt = document.getElementById('terminalPrompt');
    const terminalCursor = document.getElementById('terminalCursor');
    const terminalInputLine = document.getElementById('terminalInputLine');

    if (!terminalInput || !terminalOutput) return;

    let terminalDiscovered = false;

    // Make terminal discoverable - show input on click/focus
    function discoverTerminal() {
        if (!terminalDiscovered) {
            terminalDiscovered = true;
            terminalInputLine.style.opacity = '1';
            terminalInputLine.style.pointerEvents = 'auto';
            terminalInputLine.style.transition = 'opacity 0.5s ease';
            unlockTerminalAchievement();
            
            // Show smart help prompt
            setTimeout(() => {
                addOutput(`<span class="terminal-info" style="color: #10b981; font-weight: 600;">💡 Tip: Type 'help' to see all available commands</span>`, 'terminal-tip');
            }, 500);
            
            // Focus input after a brief delay
            setTimeout(() => {
                terminalInput.focus();
            }, 100);
        }
    }

    // Make terminal window clickable to discover
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        // Make entire terminal clickable
        terminalWindow.style.cursor = 'text';
        terminalWindow.addEventListener('click', (e) => {
            // Only discover if clicking on terminal body/output area, not if already discovered
            if (!terminalDiscovered && e.target.closest('.terminal-body')) {
                discoverTerminal();
            }
        });
    }

    // Discover on any keypress when terminal is focused/visible
    document.addEventListener('keydown', (e) => {
        if (!terminalDiscovered) {
            const terminalSection = document.querySelector('.terminal-portfolio');
            if (terminalSection) {
                const rect = terminalSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    // Only discover on regular keypresses, not shortcuts
                    const isRegularKey = e.key.length === 1 || ['Enter', 'Tab', 'Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
                    if (isRegularKey) {
                        discoverTerminal();
                    }
                }
            }
        }
    }, { once: false });

    // Update prompt based on current path
    function updatePrompt() {
        if (terminalPrompt) {
            const path = terminalState.currentPath.replace('~', '~');
            terminalPrompt.textContent = `kevin@kcoh-software:${path}$`;
        }
    }

    // Get current directory from path
    function getCurrentDir() {
        const pathParts = terminalState.currentPath.split('/').filter(p => p);
        let current = fileSystem['~'];

        for (const part of pathParts) {
            if (part === '~') continue;
            if (current && current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        return current;
    }

    // Resolve a path relative to current directory
    function resolvePath(path) {
        if (path === '~' || path === '/') {
            return fileSystem['~'];
        }

        // Handle parent directory
        if (path === '..') {
            const parts = terminalState.currentPath.split('/').filter(p => p);
            if (parts.length > 1) {
                parts.pop();
                const parentPath = parts.join('/');
                const parentParts = parentPath.split('/').filter(p => p);
                let current = fileSystem['~'];
                for (const part of parentParts) {
                    if (part === '~') continue;
                    if (current && current.children && current.children[part]) {
                        current = current.children[part];
                    } else {
                        return null;
                    }
                }
                return current;
            }
            return fileSystem['~'];
        }

        // Handle absolute paths starting with ~
        if (path.startsWith('~')) {
            path = path.substring(1);
            if (path.startsWith('/')) path = path.substring(1);
        }

        // Start from current directory
        let current = getCurrentDir();
        if (!current) return null;

        // Navigate through path parts
        const parts = path.split('/').filter(p => p);
        for (const part of parts) {
            if (part === '..') {
                // Go up one level - need to track parent
                // For simplicity, return null for now
                return null;
            } else if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }

        return current;
    }

    // Format file size
    function formatSize(bytes) {
        if (bytes < 1024) return bytes + 'B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'K';
        return (bytes / (1024 * 1024)).toFixed(1) + 'M';
    }

    // Add output line
    function addOutput(html, className = '') {
        const line = document.createElement('div');
        line.className = className || 'terminal-line';
        line.innerHTML = html;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Execute command
    function executeCommand(input) {
        const trimmed = input.trim();
        if (!trimmed) return;

        // Add to history
        terminalState.history.push(trimmed);
        terminalState.historyIndex = terminalState.history.length;
        if (terminalState.history.length > 50) {
            terminalState.history.shift();
        }

        // Show command
        addOutput(`<span class="prompt">${terminalPrompt.textContent}</span> ${trimmed}`, 'terminal-command');

        // Handle aliases
        let command = trimmed;
        const parts = command.split(' ');
        if (aliases[parts[0]]) {
            command = aliases[parts[0]] + (parts.length > 1 ? ' ' + parts.slice(1).join(' ') : '');
        }

        const cmdParts = command.split(' ').filter(p => p);
        const cmd = cmdParts[0];
        const args = cmdParts.slice(1);
        const flags = args.filter(a => a.startsWith('-'));
        const nonFlags = args.filter(a => !a.startsWith('-'));

        // Execute command
        switch (cmd) {
            case 'ls':
                handleLs(flags, nonFlags);
                break;
            case 'cd':
                handleCd(nonFlags);
                break;
            case 'pwd':
                handlePwd();
                break;
            case 'cat':
                handleCat(nonFlags);
                break;
            case 'help':
                handleHelp();
                break;
            case 'clear':
                handleClear();
                break;
            case 'whoami':
                handleWhoami();
                break;
            case 'date':
                handleDate();
                break;
            case 'echo':
                handleEcho(nonFlags);
                break;
            case 'find':
                handleFind(nonFlags);
                break;
            case 'history':
                handleHistory();
                break;
            case 'projects':
                handleProjects();
                break;
            case 'portfolio':
                handlePortfolio();
                break;
            case 'contact':
                handleContact();
                break;
            case 'about':
                handleAbout();
                break;
            case 'skills':
                handleSkills();
                break;
            case 'apps':
                handleApps();
                break;
            // Matrix command removed - now a site-wide background effect
            case 'cowsay':
                handleCowsay(nonFlags);
                break;
            case 'fortune':
                handleFortune();
                break;
            case 'neofetch':
                handleNeofetch();
                break;
            default:
                addOutput(`<span class="error">Command not found: ${cmd}</span><br><span class="terminal-info">Type 'help' for available commands</span>`, 'terminal-error');
        }
    }

    // Command handlers
    function handleLs(flags, args) {
        let targetDir = getCurrentDir();
        let targetPath = args[0]; // Get the path argument if provided

        // If a path is provided, navigate to it
        if (targetPath) {
            // Remove trailing slash if present
            targetPath = targetPath.replace(/\/$/, '');

            // Resolve the path
            const target = resolvePath(targetPath);

            if (!target) {
                addOutput(`<span class="error">ls: cannot access '${targetPath}': No such file or directory</span>`, 'terminal-error');
                return;
            }

            // If it's a file, show file info
            if (target.type === 'file') {
                const size = formatSize(target.size || 1024);
                const perms = '-rw-r--r--';
                const date = 'Dec  9 06:18';
                const filename = targetPath.split('/').pop() || targetPath;
                addOutput(
                    `<span class="file-line">
                        <span class="permissions">${perms}</span>
                        <span class="file-size">${size.padEnd(6)}</span>
                        <span class="file-date">${date}</span>
                        <span class="file-name">${filename}</span>
                    </span>`,
                    'file-line'
                );
                return;
            }

            // If it's a directory, list its contents
            if (target.type === 'directory') {
                targetDir = target;
            }
        }

        if (!targetDir || targetDir.type !== 'directory') {
            addOutput(`<span class="error">ls: cannot access directory: No such file or directory</span>`, 'terminal-error');
            return;
        }

        const showAll = flags.includes('-a') || flags.includes('-la') || flags.includes('-al');
        const showLong = flags.includes('-l') || flags.includes('-la') || flags.includes('-al');
        const children = targetDir.children || {};

        if (showLong) {
            let total = 0;
            const items = Object.entries(children)
                .filter(([name]) => showAll || !name.startsWith('.'))
                .map(([name, item]) => {
                    const size = item.size || 4096;
                    total += size;
                    const perms = item.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
                    const sizeStr = showLong ? formatSize(size) : '';
                    const date = 'Dec  9 06:18';
                    const nameClass = item.type === 'directory' ? 'dir-name' : 'file-name';
                    return { perms, size: sizeStr, date, name, nameClass, item };
                });

            addOutput(`<span class="terminal-info">total ${formatSize(total)}</span>`, 'terminal-info-line');
            
            items.forEach(({ perms, size, date, name, nameClass, item }) => {
                const desc = item.description || '';
                const clickable = item.type === 'directory' ? `onclick="terminalCd('${name}')" style="cursor: pointer;"` : 
                                 item.type === 'file' ? `onclick="terminalCat('${name}')" style="cursor: pointer;"` : '';
                addOutput(
                    `<span class="file-line" ${clickable}>
                        <span class="permissions">${perms}</span>
                        <span class="file-size">${size.padEnd(6)}</span>
                        <span class="file-date">${date}</span>
                        <span class="${nameClass}">${name}${item.type === 'directory' ? '/' : ''}</span>
                        <span class="file-desc">${desc}</span>
                    </span>`,
                    'file-line'
                );
            });
        } else {
            const items = Object.keys(children)
                .filter(name => showAll || !name.startsWith('.'))
                .map(name => {
                    const item = children[name];
                    const nameClass = item.type === 'directory' ? 'dir-name' : 'file-name';
                    return `<span class="${nameClass}" ${item.type === 'directory' ? `onclick="terminalCd('${name}')" style="cursor: pointer;"` : item.type === 'file' ? `onclick="terminalCat('${name}')" style="cursor: pointer;"` : ''}>${name}${item.type === 'directory' ? '/' : ''}</span>`;
                });
            addOutput(items.join('  '), 'terminal-ls');
        }
    }

    function handleCd(args) {
        if (args.length === 0) {
            terminalState.previousPath = terminalState.currentPath;
            terminalState.currentPath = '~';
            updatePrompt();
            return;
        }

        const target = args[0];
        let newPath = terminalState.currentPath;

        // Handle special cases
        if (target === '-') {
            const temp = terminalState.currentPath;
            terminalState.currentPath = terminalState.previousPath;
            terminalState.previousPath = temp;
            updatePrompt();
            return;
        }

        if (target === '~' || target === '/') {
            terminalState.previousPath = terminalState.currentPath;
            terminalState.currentPath = '~';
            updatePrompt();
            return;
        }

        if (target === '..') {
            const parts = newPath.split('/').filter(p => p);
            if (parts.length > 1) {
                parts.pop();
                newPath = parts.join('/');
                if (!newPath.startsWith('~')) newPath = '~/' + newPath;
            } else {
                newPath = '~';
            }
            terminalState.previousPath = terminalState.currentPath;
            terminalState.currentPath = newPath;
            updatePrompt();
            return;
        }

        // Try to resolve the path
        const targetDir = resolvePath(target);

        if (!targetDir) {
            addOutput(`<span class="error">cd: ${target}: No such file or directory</span>`, 'terminal-error');
            return;
        }

        if (targetDir.type !== 'directory') {
            addOutput(`<span class="error">cd: ${target}: Not a directory</span>`, 'terminal-error');
            return;
        }

        // Build the new path
        if (target.startsWith('~')) {
            newPath = target;
        } else {
            if (newPath === '~') {
                newPath = `~/${target}`;
            } else {
                newPath = `${newPath}/${target}`;
            }
        }

        // Clean up path (remove trailing slashes, double slashes, etc.)
        newPath = newPath.replace(/\/+/g, '/').replace(/\/$/, '');
        if (!newPath) newPath = '~';

        terminalState.previousPath = terminalState.currentPath;
        terminalState.currentPath = newPath;
        updatePrompt();
    }

    function handlePwd() {
        addOutput(terminalState.currentPath.replace('~', '/home/kevin'));
    }

    function handleCat(args) {
        if (args.length === 0) {
            addOutput(`<span class="error">cat: missing file operand</span><br><span class="terminal-info">Usage: cat &lt;file&gt;</span>`, 'terminal-error');
            return;
        }

        const filepath = args[0];

        // Try to resolve as a path first
        const target = resolvePath(filepath);

        if (!target) {
            addOutput(`<span class="error">cat: ${filepath}: No such file or directory</span>`, 'terminal-error');
            return;
        }

        if (target.type === 'directory') {
            addOutput(`<span class="error">cat: ${filepath}: Is a directory</span>`, 'terminal-error');
            return;
        }

        if (target.type === 'file') {
            const content = target.content || '';
            const lines = content.split('\n');
            lines.forEach(line => {
                addOutput(`<span class="file-content">${escapeHtml(line)}</span>`, 'terminal-cat');
            });
        } else {
            addOutput(`<span class="error">cat: ${filepath}: No such file or directory</span>`, 'terminal-error');
        }
    }

    function handleHelp() {
        const helpText = `
<span class="help-section">Available Commands:</span>

<span class="help-category">Navigation:</span>
  <span class="help-command">cd &lt;directory&gt;</span>    Change directory
  <span class="help-command">pwd</span>                      Print working directory
  <span class="help-command">ls [options]</span>              List directory contents
    <span class="help-option">-l</span>                       Long format
    <span class="help-option">-a</span>                       Show hidden files
    <span class="help-option">-la</span>                     Long format + all files

<span class="help-category">File Operations:</span>
  <span class="help-command">cat &lt;file&gt;</span>          Display file contents
  <span class="help-command">find &lt;name&gt;</span>         Search for files/directories

<span class="help-category">Information:</span>
  <span class="help-command">help</span>                      Show this help message
  <span class="help-command">whoami</span>                     Show user information
  <span class="help-command">date</span>                      Show current date/time
  <span class="help-command">history</span>                  Show command history
  <span class="help-command">clear</span>                     Clear terminal output

<span class="help-category">Project Commands:</span>
  <span class="help-command">projects</span>                   List all project categories
  <span class="help-command">portfolio</span>                 Open portfolio link
  <span class="help-command">contact</span>                  Show contact information
  <span class="help-command">about</span>                    Show about information
  <span class="help-command">skills</span>                   List technical skills
  <span class="help-command">apps</span>                     Show iOS apps information

<span class="help-category">Fun Commands:</span>
  <span class="help-command">cowsay &lt;text&gt;</span>      ASCII art cow
  <span class="help-command">fortune</span>                   Random quote
  <span class="help-command">neofetch</span>                  System information

<span class="help-category">Shortcuts:</span>
  <span class="help-command">Tab</span>                   Auto-complete
  <span class="help-command">↑/↓</span>                      Command history
  <span class="help-command">Ctrl+L</span>                   Clear terminal
        `;
        addOutput(helpText, 'terminal-help');
    }

    function handleClear() {
        terminalOutput.innerHTML = '';
    }

    function handleWhoami() {
        addOutput('kevin');
    }

    function handleDate() {
        addOutput(new Date().toLocaleString());
    }

    function handleEcho(args) {
        addOutput(args.join(' '));
    }

    function handleFind(args) {
        if (args.length === 0) {
            addOutput(`<span class="error">find: missing search term</span>`, 'terminal-error');
            return;
        }
        const searchTerm = args[0].toLowerCase();
        const results = [];
        
        function searchDir(dir, path) {
            if (!dir.children) return;
            Object.entries(dir.children).forEach(([name, item]) => {
                if (name.toLowerCase().includes(searchTerm)) {
                    results.push(`${path}/${name}`);
                }
                if (item.type === 'directory') {
                    searchDir(item, `${path}/${name}`);
                }
            });
        }

        const currentDir = getCurrentDir();
        if (currentDir) {
            searchDir(currentDir, terminalState.currentPath);
        }

        if (results.length > 0) {
            results.forEach(result => addOutput(result));
        } else {
            addOutput(`<span class="terminal-info">No matches found</span>`);
        }
    }

    function handleHistory() {
        if (terminalState.history.length === 0) {
            addOutput(`<span class="terminal-info">No command history</span>`);
            return;
        }
        terminalState.history.forEach((cmd, index) => {
            addOutput(`<span class="terminal-info">${index + 1}</span>  ${cmd}`);
        });
    }

    function handleProjects() {
        addOutput(`<span class="help-section">Available Projects:</span>`);
        addOutput(`  <span class="dir-name">ios-apps/</span>        - 10+ published iOS applications`);
        addOutput(`  <span class="dir-name">web-apps/</span>        - Full-stack React & Node.js projects`);
        addOutput(`  <span class="dir-name">api-services/</span>     - RESTful & GraphQL APIs`);
        addOutput(`  <span class="dir-name">cloud-infrastructure/</span> - AWS, Docker, Kubernetes deployments`);
        addOutput(`<br><span class="terminal-info">Use 'cd &lt;project&gt;' to explore</span>`);
    }

    function handlePortfolio() {
        addOutput(`<span class="terminal-info">Opening portfolio...</span>`);
        setTimeout(() => {
            window.open('https://kevincohen.ca', '_blank');
        }, 500);
    }

    function handleContact() {
        addOutput(`<span class="help-section">Contact Information:</span>`);
        addOutput(`  Email: <a href="mailto:inquiries@kcoh.ca" class="terminal-link">inquiries@kcoh.ca</a>`);
        addOutput(`  Portfolio: <a href="https://kevincohen.ca" target="_blank" class="terminal-link">kevincohen.ca</a>`);
    }

    function handleAbout() {
        addOutput(`<span class="help-section">About KCOH Software Inc.</span>`);
        addOutput(`Professional software development with 10+ iOS apps on App Store.`);
        addOutput(`Specializing in modern web technologies, mobile development, and cloud infrastructure.`);
    }

    function handleSkills() {
        addOutput(`<span class="help-section">Technical Skills:</span>`);
        addOutput(`  Swift, SwiftUI, React, Vue.js, Angular, Node.js, Python`);
        addOutput(`  AWS, Docker, Kubernetes, PostgreSQL, MongoDB`);
        addOutput(`  iOS Development, Web Development, API Development`);
    }

    function handleApps() {
        addOutput(`<span class="help-section">iOS Applications:</span>`);
        addOutput(`  10+ published iOS apps on the App Store built with Swift & SwiftUI 🍎`);
        addOutput(`  Visit <a href="https://kevincohen.ca" target="_blank" class="terminal-link">kevincohen.ca</a> for full portfolio`);
    }

    // Matrix command removed - now a site-wide background effect

    function handleCowsay(args) {
        const text = args.join(' ') || 'Hello from KCOH Terminal!';
        const textLength = text.length;
        const border = ' ' + '_'.repeat(textLength + 2);
        const cow = `
<span class="cowsay">${border}</span>
<span class="cowsay"> < ${text} ></span>
<span class="cowsay">${border.replace('_', '-').replace(/_/g, '-')}</span>
<span class="cowsay">        \\   ^__^</span>
<span class="cowsay">         \\  (oo)\\_______</span>
<span class="cowsay">            (__)\\       )\\/\\</span>
<span class="cowsay">                ||----w |</span>
<span class="cowsay">                ||     ||</span>`;
        addOutput(cow, 'terminal-cowsay');
    }

    function handleFortune() {
        const fortunes = [
            'The best code is code you never have to write.',
            'Premature optimization is the root of all evil.',
            'Code is like humor. When you have to explain it, it\'s bad.',
            'First, solve the problem. Then, write the code.',
            'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            'The only way to learn a new programming language is by writing programs in it.',
            'Programs must be written for people to read, and only incidentally for machines to execute.'
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        addOutput(`<span class="fortune-text">${fortune}</span>`, 'terminal-fortune');
    }

    function handleNeofetch() {
        const neofetch = `
<span class="neofetch">
       <span class="neofetch-logo">KCOH</span>@<span class="neofetch-logo">kcoh-software</span>
       ------------
       OS: macOS
       Host: KCOH Software Inc.
       Kernel: Web 2.0
       Uptime: Always online
       Shell: Interactive Terminal v2.0
       CPU: JavaScript Engine
       Memory: Optimized
       Disk: Cloud Storage
       Terminal: Browser-based
       Editor: VS Code / Xcode
       Language: JavaScript, Swift, Python
</span>`;
        addOutput(neofetch, 'terminal-neofetch');
    }

    // Auto-completion
    function getCompletions(input) {
        const parts = input.split(' ');
        if (parts.length === 1) {
            // Command completion
            const commands = ['ls', 'cd', 'pwd', 'cat', 'help', 'clear', 'whoami', 'date', 'echo', 'find', 'history', 'projects', 'portfolio', 'contact', 'about', 'skills', 'apps', 'cowsay', 'fortune', 'neofetch'];
            return commands.filter(cmd => cmd.startsWith(input));
        } else {
            // File/directory completion
            const currentDir = getCurrentDir();
            if (currentDir && currentDir.children) {
                const children = Object.keys(currentDir.children);
                const lastPart = parts[parts.length - 1];
                return children.filter(name => name.startsWith(lastPart));
            }
        }
        return [];
    }

    // Event listeners
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value;
            terminalInput.value = '';
            executeCommand(command);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (terminalState.historyIndex > 0) {
                terminalState.historyIndex--;
                terminalInput.value = terminalState.history[terminalState.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (terminalState.historyIndex < terminalState.history.length - 1) {
                terminalState.historyIndex++;
                terminalInput.value = terminalState.history[terminalState.historyIndex] || '';
            } else {
                terminalState.historyIndex = terminalState.history.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const completions = getCompletions(terminalInput.value);
            if (completions.length === 1) {
                const parts = terminalInput.value.split(' ');
                if (parts.length === 1) {
                    terminalInput.value = completions[0] + ' ';
                } else {
                    parts[parts.length - 1] = completions[0];
                    terminalInput.value = parts.join(' ') + (getCurrentDir()?.children[completions[0]]?.type === 'directory' ? '/' : ' ');
                }
            } else if (completions.length > 1) {
                addOutput(`<span class="terminal-info">${completions.join('  ')}</span>`, 'terminal-completions');
            }
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            handleClear();
        }
    });

    terminalInput.addEventListener('input', () => {
        terminalState.historyIndex = terminalState.history.length;
    });

    // Global functions for clickable files
    window.terminalCd = (name) => {
        terminalInput.value = `cd ${name}`;
        executeCommand(`cd ${name}`);
    };

    window.terminalCat = (name) => {
        terminalInput.value = `cat ${name}`;
        executeCommand(`cat ${name}`);
    };

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initial welcome
    updatePrompt();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveTerminalPortfolio);
} else {
    initInteractiveTerminalPortfolio();
}

