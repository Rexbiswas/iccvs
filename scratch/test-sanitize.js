import { sanitize } from '../api/_utils/sanitize.js';
import { schemas } from '../api/_utils/validate.js';

const longInput = "a".repeat(6000);

// Test cases containing SSTI/HTML/XSS injections
const testPayloads = {
    name: "John Doe",
    email: "john@example.com",
    course: "Fashion Designing ${7*7}", // JS template injection
    subject: "Inquiry {{7*7}} <% system('id') %>", // EJS / Pug / Jinja injection
    message: "<script>alert('XSS')</script><iframe src='javascript:void(0)'>", // HTML / XSS injection
    nested: {
        field1: "Normal text",
        field2: "Attack ${process.mainModule.require('child_process').execSync('whoami')}"
    },
    arrayField: [
        "Normal 1",
        "Attack {{ 1 + 1 }}"
    ],
    password: "MySuperSecretPassword${123}!" + longInput, // Should NOT be sanitized or truncated
    longString: longInput, // Standard string, should be truncated to 5000
    content: longInput // Blog content, should be allowed up to 100,000
};

console.log("=== ORIGINAL PAYLOAD ===");
console.log(`Original longString length: ${testPayloads.longString.length}`);
console.log(`Original content length: ${testPayloads.content.length}`);
console.log(`Original password length: ${testPayloads.password.length}`);

console.log("\n=== SANITIZING... ===");
const sanitized = sanitize(testPayloads);

console.log("\n=== SANITIZED PAYLOAD STATS ===");
console.log(`Sanitized longString length: ${sanitized.longString.length}`);
console.log(`Sanitized content length: ${sanitized.content.length}`);
console.log(`Sanitized password length: ${sanitized.password.length}`);

// Automated validations
const checks = [
    {
        name: "Neutralizes JS template strings (${)",
        pass: !sanitized.course.includes("${") && !sanitized.nested.field2.includes("${")
    },
    {
        name: "Neutralizes braces ({{)",
        pass: !sanitized.subject.includes("{{") && !sanitized.arrayField[1].includes("{{")
    },
    {
        name: "Neutralizes HTML tags (<script>)",
        pass: !sanitized.message.includes("<script>")
    },
    {
        name: "Bypasses password fields entirely (no sanitization or truncation)",
        pass: sanitized.password === "MySuperSecretPassword${123}!" + longInput
    },
    {
        name: "Truncates standard long strings to 5000 chars",
        pass: sanitized.longString.length === 5000
    },
    {
        name: "Allows long blog content (> 5000 chars)",
        pass: sanitized.content.length === 6000
    }
];

console.log("\n=== SANITIZATION TEST RESULTS ===");
let allPassed = true;
for (const check of checks) {
    console.log(`${check.pass ? '✅' : '❌'} ${check.name}`);
    if (!check.pass) allPassed = false;
}

console.log("\n=== TESTING ALLOW-LIST JOI VALIDATION ===");

const validAdmission = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
    city: "New Delhi",
    course: "Interior Designing"
};

const invalidAdmissionName = {
    name: "Jane Smith <script>", // contains invalid characters
    email: "jane.smith@example.com",
    phone: "9876543210"
};

const invalidAdmissionEmail = {
    name: "Jane Smith",
    email: "not-an-email",
    phone: "9876543210"
};

const resValid = schemas.admission.validate(validAdmission);
const resInvalidName = schemas.admission.validate(invalidAdmissionName);
const resInvalidEmail = schemas.admission.validate(invalidAdmissionEmail);

// Paris Tests
const validParis = { name: "Jean Luc", email: "jean@paris.fr", phone: "9876543210" };
const invalidParisName = { name: "Jean Luc <script>", email: "jean@paris.fr", phone: "9876543210" };
const resValidParis = schemas.paris.validate(validParis);
const resInvalidParisName = schemas.paris.validate(invalidParisName);

// Partner Tests
const validPartner = { name: "ABC Group", email: "info@abc.com", phone: "9876543210", city: "Mumbai" };
const invalidPartnerPhone = { name: "ABC Group", email: "info@abc.com", phone: "invalid-phone", city: "Mumbai" };
const resValidPartner = schemas.partner.validate(validPartner);
const resInvalidPartnerPhone = schemas.partner.validate(invalidPartnerPhone);

// Password LP DoS Tests
const validRegister = {
    username: "testuser",
    email: "test@example.com",
    password: "safePassword123",
    firstName: "First",
    lastName: "Last",
    phone: "9876543210"
};
const invalidRegisterPassword = {
    ...validRegister,
    password: "a".repeat(150) // exceeds 128 characters
};

const resValidRegister = schemas.register.validate(validRegister);
const resInvalidRegisterPassword = schemas.register.validate(invalidRegisterPassword);

console.log(`Valid payload validation error: ${resValid.error ? resValid.error.message : 'None (Passed)'}`);
console.log(`Invalid name validation error: ${resInvalidName.error ? resInvalidName.error.message : 'None'}`);
console.log(`Invalid email validation error: ${resInvalidEmail.error ? resInvalidEmail.error.message : 'None'}`);
console.log(`Valid Paris validation error: ${resValidParis.error ? resValidParis.error.message : 'None (Passed)'}`);
console.log(`Invalid Paris Name validation error: ${resInvalidParisName.error ? resInvalidParisName.error.message : 'None'}`);
console.log(`Valid Partner validation error: ${resValidPartner.error ? resValidPartner.error.message : 'None (Passed)'}`);
console.log(`Invalid Partner Phone validation error: ${resInvalidPartnerPhone.error ? resInvalidPartnerPhone.error.message : 'None'}`);
console.log(`Valid Register validation error: ${resValidRegister.error ? resValidRegister.error.message : 'None (Passed)'}`);
console.log(`Invalid Register Password (LP DoS attempt) validation error: ${resInvalidRegisterPassword.error ? resInvalidRegisterPassword.error.message : 'None'}`);

const validationChecks = [
    {
        name: "Allows valid admission data",
        pass: !resValid.error
    },
    {
        name: "Rejects invalid names with special characters (HTML tags)",
        pass: !!resInvalidName.error
    },
    {
        name: "Rejects malformed emails",
        pass: !!resInvalidEmail.error
    },
    {
        name: "Allows valid Paris Project data",
        pass: !resValidParis.error
    },
    {
        name: "Rejects invalid Paris names with special characters",
        pass: !!resInvalidParisName.error
    },
    {
        name: "Allows valid Partner/Franchise data",
        pass: !resValidPartner.error
    },
    {
        name: "Rejects invalid Partner phone numbers",
        pass: !!resInvalidPartnerPhone.error
    },
    {
        name: "Allows valid user registration details",
        pass: !resValidRegister.error
    },
    {
        name: "Blocks registration with long password (LP DoS prevention)",
        pass: !!resInvalidRegisterPassword.error
    }
];

console.log("\n=== VALIDATION TEST RESULTS ===");
for (const check of validationChecks) {
    console.log(`${check.pass ? '✅' : '❌'} ${check.name}`);
    if (!check.pass) allPassed = false;
}

// === ADVANCED CLIPBOARD TESTING ===
console.log("\n=== TESTING CLIPBOARD SECURITY UTILITY ===");

// Mock browser globals for Node.js context
global.window = { location: { origin: "https://iccvs.edu.in" } };
let lastWrittenClipboardText = "";
global.navigator = {
    clipboard: {
        writeText: async (text) => {
            lastWrittenClipboardText = text;
        }
    }
};

// Dynamically import ES modules clipboard helper
const { safeCopyToClipboard } = await import('../src/utils/clipboard.js');

const clipboardChecks = [];

// Check 1: Allows valid same-origin link
try {
    const text = "https://iccvs.edu.in/blog?id=65ed3c2e1f4a5b6c7d8e9f01";
    await safeCopyToClipboard(text);
    clipboardChecks.push({
        name: "Allows copying same-origin URL",
        pass: lastWrittenClipboardText === text
    });
} catch (err) {
    clipboardChecks.push({ name: "Allows copying same-origin URL", pass: false });
}

// Check 2: Blocks external phishing link
try {
    await safeCopyToClipboard("https://malicious-phishing-site.com/blog?id=123");
    clipboardChecks.push({ name: "Blocks external phishing origin", pass: false });
} catch (err) {
    clipboardChecks.push({
        name: "Blocks external phishing origin",
        pass: err.message.includes("domain mismatch")
    });
}

// Check 3: Pastejacking defense (strips newlines)
try {
    await safeCopyToClipboard("https://iccvs.edu.in/blog\n\nmalicious_cmd_here");
    clipboardChecks.push({
        name: "Pastejacking defense (strips newlines and carriage returns)",
        pass: lastWrittenClipboardText === "https://iccvs.edu.in/blogmalicious_cmd_here"
    });
} catch (err) {
    clipboardChecks.push({ name: "Pastejacking defense (strips newlines and carriage returns)", pass: false });
}

// Check 4: Rejects excessively long clipboard buffers
try {
    await safeCopyToClipboard("a".repeat(2500));
    clipboardChecks.push({ name: "Rejects text exceeding clipboard length limits", pass: false });
} catch (err) {
    clipboardChecks.push({
        name: "Rejects text exceeding clipboard length limits",
        pass: err.message.includes("exceeds safe length")
    });
}

console.log("\n=== CLIPBOARD SECURITY TEST RESULTS ===");
for (const check of clipboardChecks) {
    console.log(`${check.pass ? '✅' : '❌'} ${check.name}`);
    if (!check.pass) allPassed = false;
}

// === COOLDOWN & THROTTLE TESTING ===
console.log("\n=== TESTING REQUEST REPLAY & RATE COOLDOWN CHECKS ===");

const cooldownChecks = [];

// 1. Test Forgot Password Throttle (60-second limit)
import authRouter, { resetTokens } from '../backend/routes/auth.js';
import User from '../backend/models/User.js';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Mock nodemailer & User model
const originalCreateTransport = nodemailer.createTransport;
nodemailer.createTransport = () => ({
    sendMail: async () => ({ messageId: 'dummy-id' })
});
process.env.GOOGLE_APP_PASSWORD = 'dummy-password';

const originalUserFindOne = User.findOne;
User.findOne = async () => ({ email: 'test-throttle@example.com' });

const forgotPasswordHandler = authRouter.stack.find(
    layer => layer.route && layer.route.path === '/forgot-password' && layer.route.methods.post
).route.stack[0].handle;

const runForgotPassword = async (email) => {
    let responseStatus = 200;
    let responseData = {};
    const req = { body: { email } };
    const res = {
        status: (code) => {
            responseStatus = code;
            return {
                json: (data) => { responseData = data; }
            };
        },
        json: (data) => { responseData = data; }
    };
    await forgotPasswordHandler(req, res);
    return { status: responseStatus, data: responseData };
};

resetTokens.clear();

const res1 = await runForgotPassword('test-throttle@example.com');
const hasToken1 = resetTokens.has('test-throttle@example.com');
const res2 = await runForgotPassword('test-throttle@example.com');

cooldownChecks.push({
    name: "First forgot-password request succeeds and sets token",
    pass: res1.status === 200 && hasToken1
});

cooldownChecks.push({
    name: "Subsequent forgot-password request within 60s is throttled with 429",
    pass: res2.status === 429 && res2.data.message.includes("Please wait 60 seconds")
});

User.findOne = originalUserFindOne;

// 2. Test lead submission 5-minute cooldown checks for Express routers
import admissionRouter from '../backend/routes/admission.js';
import AdmissionLead from '../backend/models/AdmissionLead.js';

import aviationRouter from '../backend/routes/aviation.js';
import AviationLead from '../backend/models/AviationLead.js';

import contactRouter from '../backend/routes/contact.js';
import ContactLead from '../backend/models/ContactLead.js';

import parisRouter from '../backend/routes/paris.js';
import ParisLead from '../backend/models/ParisLead.js';

import partnerRouter from '../backend/routes/partner.js';
import PartnerLead from '../backend/models/PartnerLead.js';

import stepleadsRouter from '../backend/routes/stepleads.js';
import StepLead from '../backend/models/StepLead.js';

// 3. Test lead submission 5-minute cooldown checks for Vercel API Handlers
import admissionHandler from '../api/admission.js';
import aviationHandler from '../api/aviation.js';
import contactHandler from '../api/contact.js';
import parisLeadHandler from '../api/paris/lead.js';
import partnerHandler from '../api/partner.js';
import partnerLeadsHandler from '../api/partner/leads.js';
import stepLeadsHandler from '../api/step-leads.js';

const originalReadyState = mongoose.connection.readyState;
Object.defineProperty(mongoose.connection, 'readyState', {
    writable: true,
    value: 1
});

const testFormCooldown = async (router, model, validPayload, formName) => {
    const route = router.stack.find(
        layer => layer.route && (layer.route.path === '/' || layer.route.path === '/leads' || layer.route.path === '/lead') && layer.route.methods.post
    ).route;

    const originalFindOne = model.findOne;
    const originalSave = model.prototype.save;
    model.prototype.save = async function() { return this; };

    let queryCallCount = 0;
    model.findOne = async (query) => {
        queryCallCount++;
        if (query.email && query.createdAt && query.createdAt.$gte instanceof Date) {
            if (queryCallCount === 1) return null;
            return { email: query.email, createdAt: new Date() };
        }
        return null;
    };

    let responseStatus = 201;
    let responseData = {};
    const req = { body: { ...validPayload } };
    const res = {
        status: (code) => {
            responseStatus = code;
            return {
                json: (data) => { responseData = data; },
                send: (data) => { responseData = { message: data }; }
            };
        },
        json: (data) => { responseData = data; },
        send: (data) => { responseData = { message: data }; }
    };

    let idx = 0;
    const next = async (err) => {
        if (err) throw err;
        const layer = route.stack[idx++];
        if (layer) {
            await layer.handle(req, res, next);
        }
    };

    await next();
    const firstStatus = responseStatus;

    idx = 0;
    responseStatus = 201;
    await next();
    const secondStatus = responseStatus;

    model.findOne = originalFindOne;
    model.prototype.save = originalSave;

    cooldownChecks.push({
        name: `Express ${formName} Form - First submission succeeds (200 or 201)`,
        pass: firstStatus === 200 || firstStatus === 201
    });

    cooldownChecks.push({
        name: `Express ${formName} Form - Replay within 5m rejected with 409`,
        pass: secondStatus === 409
    });
};

const testVercelCooldown = async (handler, modelName, validPayload, formName) => {
    const model = mongoose.models[modelName];
    if (!model) {
        throw new Error(`Model ${modelName} not found in mongoose.models`);
    }

    const originalFindOne = model.findOne;
    const originalSave = model.prototype.save;
    model.prototype.save = async function() { return this; };

    let queryCallCount = 0;
    model.findOne = async (query) => {
        queryCallCount++;
        if (query.email && query.createdAt && query.createdAt.$gte instanceof Date) {
            if (queryCallCount === 1) return null;
            return { email: query.email, createdAt: new Date() };
        }
        return null;
    };

    let responseStatus = 200;
    let responseData = {};
    const req = {
        method: 'POST',
        body: { ...validPayload },
        headers: {}
    };
    const res = {
        status: (code) => {
            responseStatus = code;
            return {
                json: (data) => { responseData = data; },
                end: () => {}
            };
        },
        json: (data) => { responseData = data; },
        setHeader: () => {}
    };

    await handler(req, res);
    const firstStatus = responseStatus;

    responseStatus = 200;
    await handler(req, res);
    const secondStatus = responseStatus;

    model.findOne = originalFindOne;
    model.prototype.save = originalSave;

    cooldownChecks.push({
        name: `Vercel ${formName} Handler - First submission succeeds (200)`,
        pass: firstStatus === 200
    });

    cooldownChecks.push({
        name: `Vercel ${formName} Handler - Replay within 5m rejected with 409`,
        pass: secondStatus === 409
    });
};

await testFormCooldown(admissionRouter, AdmissionLead, { name: "Jane Smith", email: "jane.smith@example.com", phone: "9876543210", city: "New Delhi", course: "Interior Designing" }, "Admission");
await testFormCooldown(aviationRouter, AviationLead, { name: "Jane Smith", email: "jane.smith@example.com", phone: "9876543210", city: "New Delhi", course: "Aviation" }, "Aviation");
await testFormCooldown(contactRouter, ContactLead, { name: "Jane Smith", email: "jane.smith@example.com", phone: "9876543210", subject: "Help", message: "Hello there" }, "Contact");
await testFormCooldown(parisRouter, ParisLead, { name: "Jean Luc", email: "jean@paris.fr", phone: "9876543210" }, "Paris");
await testFormCooldown(partnerRouter, PartnerLead, { name: "ABC Group", email: "info@abc.com", phone: "9876543210", city: "Mumbai" }, "Partner");
await testFormCooldown(stepleadsRouter, StepLead, { name: "Jane Smith", email: "jane.smith@example.com", mobile: "9876543210", city: "New Delhi", readyToStart: "Immediately", inquiryType: "Career Guide" }, "StepLeads");

// Run Vercel Handlers Tests
await testVercelCooldown(admissionHandler, "Admission", { name: "Jane Smith", email: "jane.smith@example.com", phone: "9876543210", city: "New Delhi", course: "Interior Designing" }, "Admission");
await testVercelCooldown(aviationHandler, "AviationLead", { name: "Jane Smith", email: "jane.smith@example.com", phone: "9876543210", city: "New Delhi", course: "Aviation" }, "Aviation");
await testVercelCooldown(contactHandler, "Contact", { name: "Jane Smith", email: "jane.smith@example.com", phone: "9876543210", subject: "Help", message: "Hello there" }, "Contact");
await testVercelCooldown(parisLeadHandler, "ParisLead", { name: "Jean Luc", email: "jean@paris.fr", phone: "9876543210" }, "Paris");
await testVercelCooldown(partnerHandler, "Partner", { name: "ABC Group", email: "info@abc.com", phone: "9876543210", city: "Mumbai" }, "Partner (franchise)");
await testVercelCooldown(partnerLeadsHandler, "Partner", { name: "ABC Group", email: "info@abc.com", phone: "9876543210", city: "Mumbai" }, "Partner (leads)");
await testVercelCooldown(stepLeadsHandler, "StepLead", { name: "Jane Smith", email: "jane.smith@example.com", mobile: "9876543210", city: "New Delhi", readyToStart: "Immediately", inquiryType: "Career Guide" }, "StepLeads");

nodemailer.createTransport = originalCreateTransport;

Object.defineProperty(mongoose.connection, 'readyState', {
    writable: true,
    value: originalReadyState
});

console.log("\n=== COOLDOWN & THROTTLE TEST RESULTS ===");
for (const check of cooldownChecks) {
    console.log(`${check.pass ? '✅' : '❌'} ${check.name}`);
    if (!check.pass) allPassed = false;
}

if (allPassed) {
    console.log("\n🎉 ALL SECURITY SANITIZATION, VALIDATION, CLIPBOARD & COOLDOWN CHECKS PASSED!");
} else {
    console.log("\n🛑 SOME SECURITY CHECKS FAILED!");
    process.exit(1);
}

