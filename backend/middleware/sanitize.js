/**
 * Input sanitization utility to prevent Server-Side Template Injection (SSTI),
 * Cross-Site Scripting (XSS), and HTML Injection.
 */

function sanitizeValue(val, key) {
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
        return val.map((item) => sanitizeValue(item, key));
    }

    if (val !== null && typeof val === 'object') {
        const sanitizedObj = {};
        for (const [k, v] of Object.entries(val)) {
            sanitizedObj[k] = sanitizeValue(v, k);
        }
        return sanitizedObj;
    }

    return val;
}

/**
 * Express middleware to sanitize body, query, and params
 */
export const sanitizeRequest = (req, res, next) => {
    if (req.body) {
        req.body = sanitizeValue(req.body);
    }
    if (req.query) {
        req.query = sanitizeValue(req.query);
    }
    if (req.params) {
        req.params = sanitizeValue(req.params);
    }
    next();
};
