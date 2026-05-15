// Standard Node 18+ global fetch test script

const BASE_URL = 'http://localhost:5001/api';

async function testAdmissionForm() {
    console.log('🧪 Testing Admission Form API...');
    const testData = {
        name: "API Tester " + Math.floor(Math.random() * 1000),
        email: `test-${Date.now()}@example.com`,
        phone: "9876543210",
        course: "Fashion Design",
        city: "Delhi"
    };

    try {
        const response = await fetch(`${BASE_URL}/admission`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('✅ Admission API Test Passed!');
        } else {
            console.log('❌ Admission API Test Failed!');
        }
    } catch (error) {
        console.error('❌ Admission API Test Error:', error.message);
    }
}

async function testStepLeads() {
    console.log('\n🧪 Testing StepLeads API...');
    const testData = {
        name: "Step Tester",
        email: `step-${Date.now()}@example.com`,
        phone: "9876543211",
        course: "Interior Design"
    };

    try {
        const response = await fetch(`${BASE_URL}/step-leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('✅ StepLeads API Test Passed!');
        } else {
            console.log('❌ StepLeads API Test Failed!');
        }
    } catch (error) {
        console.error('❌ StepLeads API Test Error:', error.message);
    }
}

async function runTests() {
    console.log('🚀 Starting API Tests against http://localhost:5001\n');
    await testAdmissionForm();
    await testStepLeads();
    console.log('\n🏁 Tests Finished');
}

runTests();
