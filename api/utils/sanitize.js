/**
 * Input sanitization utility for Vercel serverless functions.
 * Prevents SSTI, XSS, and HTML Injection.
 */

export function sanitize(val, key) {
    // Bypass fields that require raw input (passwords, codes, tokens)
    if (key === 'password' || key === 'newPassword' || key === 'token' || key === 'code') {
        return val;
    }

    if (typeof val === 'string') {
        return val
            // 1. Escape HTML special characters
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            // 2. Escape template engine delimiters to prevent SSTI
            .replace(/\{/g, '&#123;')
            .replace(/\}/g, '&#125;')
            .replace(/\$/g, '&#36;')
            .replace(/%/g, '&#37;');
    }

    if (Array.isArray(val)) {
        return val.map((item) => sanitize(item, key));
    }

    if (val !== null && typeof val === 'object') {
        const sanitizedObj = {};
        for (const [k, v] of Object.entries(val)) {
            sanitizedObj[k] = sanitize(v, k);
        }
        return sanitizedObj;
    }

    return val;
}
