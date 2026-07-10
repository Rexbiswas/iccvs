import fs from 'fs';
import path from 'path';

const SRC_DIR = 'f:\\major project\\iccvs-project\\src';
const APP_FILE = path.join(SRC_DIR, 'App.jsx');

// 1. Extract defined routes from App.jsx
const appContent = fs.readFileSync(APP_FILE, 'utf8');
const routeMatches = [...appContent.matchAll(/path=["']([^"']+)["']/g)];
const definedRoutes = new Set(routeMatches.map(m => m[1]));

// Add dynamic patterns
definedRoutes.add('*');
const baseRoutes = Array.from(definedRoutes);

console.log('--- Defined Routes ---');
console.log(baseRoutes);

// 2. Scan all .jsx files for <Link to="..."> or <NavLink to="...">
function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDirectory(fullPath);
        } else if (file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const linkMatches = [...content.matchAll(/to=["']([^"']+)["']/g)];
            
            for (const match of linkMatches) {
                const target = match[1];
                if (target.startsWith('/') && !target.includes(':')) {
                    if (!definedRoutes.has(target)) {
                        // Check for common patterns like /blog vs /iccvs-360/blog
                        console.log(`Potential Broken Link: "${target}" in ${file}`);
                    }
                }
            }
        }
    }
}

console.log('\n--- Scanning for Broken Internal Links ---');
scanDirectory(SRC_DIR);
