import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from root .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

async function testCreateOrUpdateLead() {
    console.log('Access Key:', ACCESS_KEY ? 'Present' : 'Missing');
    console.log('Secret Key:', SECRET_KEY ? 'Present' : 'Missing');

    if (!ACCESS_KEY || !SECRET_KEY) {
        console.error('Error: Credentials are not present in .env file.');
        return;
    }

    const url = 'https://api.nopaperforms.io/lead/v1/createOrUpdate';
    const payload = {
        country_dial_code: "+91",
        mobile: "9087876509",
        search_criteria: "mobile",
        name: "Rishi test",
        source: "Wesbite",
        medium: "Google Ads",
        campaign: "B2B",
        cf_course_of_interest: "Photography",
        source: "custom",
        medium: "custom",
        campaign_1: "custom",
        state: "Delhi",
        city: "South Delhi",
        cf_investment: "25 to 30 lakhs",
        cf_preference: "Immediately"
    };

    console.log('\nSending POST request to:', url);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await axios({
            method: 'POST',
            url: url,
            headers: {
                'access-key': ACCESS_KEY,
                'secret-key': SECRET_KEY,
                'Content-Type': 'application/json'
            },
            data: payload
        });

        console.log('\n--- API Success Response ---');
        console.log(JSON.stringify(response.data, null, 2));
    } catch (err) {
        console.error('\n--- API Error Response ---');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.error('Error Message:', err.message);
        }
    }
}

testCreateOrUpdateLead();
