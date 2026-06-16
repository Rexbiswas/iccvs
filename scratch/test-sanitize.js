import { sanitize } from '../api/utils/sanitize.js';

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
    password: "MySuperSecretPassword${123}!" // Should NOT be sanitized
};

console.log("=== ORIGINAL PAYLOAD ===");
console.log(JSON.stringify(testPayloads, null, 2));

console.log("\n=== SANITIZING... ===");
const sanitized = sanitize(testPayloads);

console.log("\n=== SANITIZED PAYLOAD ===");
console.log(JSON.stringify(sanitized, null, 2));

// Automated validations
const checks = [
    {
        name: "Neutralizes JS template strings (${)",
        pass: !sanitized.course.includes("${") && !sanitized.nested.field2.includes("${")
    },
    {
        name: "Neutralizes braces ({{)",
        pass: !JSON.stringify(sanitized).includes("{{")
    },
    {
        name: "Neutralizes HTML tags (<script>)",
        pass: !JSON.stringify(sanitized).includes("<script>")
    },
    {
        name: "Bypasses password fields",
        pass: sanitized.password === "MySuperSecretPassword${123}!"
    }
];

console.log("\n=== TEST RESULTS ===");
let allPassed = true;
for (const check of checks) {
    console.log(`${check.pass ? '✅' : '❌'} ${check.name}`);
    if (!check.pass) allPassed = false;
}

if (allPassed) {
    console.log("\n🎉 ALL SECURITY SANITIZATION CHECKS PASSED!");
} else {
    console.log("\n🛑 SOME SECURITY SANITIZATION CHECKS FAILED!");
    process.exit(1);
}
