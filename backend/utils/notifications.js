import axios from 'axios';
import { getGoogleTransporter } from './email.js';

/**
 * Sends a welcome email to the lead
 */
export const sendWelcomeEmail = async (email, name, course) => {
    try {
        const transporter = await getGoogleTransporter();
        if (!transporter) return false;
        const mailOptions = {
            from: `"INSD Admissions" <${process.env.GOOGLE_EMAIL || 'admissions@insd.edu.in'}>`,
            to: email,
            subject: "Welcome to INSD - Inquiry Received!",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #db3436;">Hello ${name},</h2>
                    <p>Thank you for reaching out to **International School of Design (INSD)**!</p>
                    <p>We have received your inquiry for the <strong>${course}</strong> program. Our admissions team is currently reviewing your details and will get back to you within two business days.</p>
                    <p>In the meantime, feel free to explore our website or prepare some questions for our counselors.</p>
                    <br/>
                    <p>Best Regards,<br/><strong>The INSD Admissions Team</strong></p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log(`[Email] Welcome email sent to ${email}`);
        return true;
    } catch (err) {
        console.error(`[Email Error] Failed to send email to ${email}:`, err.message);
        return false;
    }
};

export const sendSMS = async (phone, name) => {
    const API_KEY = process.env.FAST2SMS_API_KEY;
    const phoneNo = phone.replace(/[^0-9]/g, '').slice(-10);

    if (!API_KEY) {
        console.warn(`[SMS MOCK] API Key missing. Simulation for: ${phoneNo}`);
        return true;
    }

    if (phoneNo.length !== 10) {
        console.error(`[SMS Error] Invalid phone number (must be 10 digits): ${phoneNo}`);
        return false;
    }

    try {
        const isDLT = !!process.env.FAST2SMS_TEMPLATE_ID;
        const payload = {
            route: isDLT ? "dlt" : "q", // 'q' (Quick) route is better for testing without DLT
            message: isDLT ? process.env.FAST2SMS_TEMPLATE_ID : `Hello ${name}, thank you for your inquiry at INSD. Our team will contact you soon.`,
            language: "english",
            flash: 0,
            numbers: phoneNo,
        };

        if (isDLT) {
            payload.sender_id = process.env.FAST2SMS_SENDER_ID || "INSDIN";
            payload.variables_values = name;
        }

        const response = await axios({
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: { 
                "authorization": API_KEY,
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            data: payload,
            timeout: 8000 // 8 second timeout
        });

        if (response.data.return === true) {
            console.log(`[SMS] Message successfully queued for ${phoneNo}`);
            return true;
        } else {
            console.error(`[SMS Error] Gateway rejected: ${JSON.stringify(response.data)}`);
            return false;
        }
    } catch (err) {
        const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
        console.error(`[SMS Error] Failed to send to ${phoneNo}:`, errorMsg);
        return false;
    }
};

/**
 * Sends a notification email to the Admin with lead details
 */
export const sendAdminLeadEmail = async (adminEmail, leadData, type = "General Inquiry") => {
    try {
        const transporter = await getGoogleTransporter();
        if (!transporter) return false;
        
        // Build a readable list of lead details
        const detailsHtml = Object.entries(leadData)
            .filter(([key, value]) => value && typeof value !== 'object')
            .map(([key, value]) => `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`)
            .join('');

        const mailOptions = {
            from: `"INSD Lead System" <${process.env.GOOGLE_EMAIL || 'admissions@insd.edu.in'}>`,
            to: adminEmail,
            subject: `[NEW LEAD] ${type} - ${leadData.name || leadData.fullName || 'Unknown'}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #db3436; border-bottom: 2px solid #db3436; padding-bottom: 10px;">New ${type} Submission</h2>
                    <p>A new lead has been captured on the INSD website.</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <ul style="list-style: none; padding: 0;">
                            ${detailsHtml}
                        </ul>
                    </div>
                    <p style="font-size: 12px; color: #777;">Captured on: ${new Date().toLocaleString()}</p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log(`[Admin Email] Lead notification sent to ${adminEmail}`);
        return true;
    } catch (err) {
        console.error(`[Admin Email Error] Failed to send to ${adminEmail}:`, err.message);
        return false;
    }
};

/**
 * Sends a WhatsApp message via Fast2SMS
 */
export const sendWhatsApp = async (phone, name) => {
    const API_KEY = process.env.FAST2SMS_API_KEY;
    const phoneNo = phone.replace(/[^0-9]/g, '').slice(-10);
    const wabaId = process.env.WABA_PHONE_ID;
    const templateId = process.env.WHATSAPP_TEMPLATE_ID;

    if (!API_KEY || !wabaId || !templateId) {
        console.warn(`[WhatsApp MOCK] Credentials missing in .env (WABA_PHONE_ID or WHATSAPP_TEMPLATE_ID). Simulating for: ${phoneNo}`);
        // Log what would have been sent
        console.log(`[WhatsApp Payload Draft] To: ${phoneNo}, Name: ${name}, Template: ${templateId || 'N/A'}`);
        return true;
    }

    try {
        const response = await axios({
            method: 'POST',
            url: `https://www.fast2sms.com/dev/whatsapp/v1/send`,
            headers: { 
                "authorization": API_KEY,
                "Content-Type": "application/json"
            },
            data: {
                numbers: phoneNo,
                message_id: templateId,
                phone_number_id: wabaId,
                variables_values: name
            },
            timeout: 10000
        });

        if (response.data.return === true) {
            console.log(`[WhatsApp] Success! Message sent to ${phoneNo}`);
            return true;
        } else {
            console.error(`[WhatsApp Error] Gateway rejection: ${JSON.stringify(response.data)}`);
            return false;
        }
    } catch (err) {
        const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
        console.error(`[WhatsApp Error] Transmission failed for ${phoneNo}:`, errorMsg);
        return false;
    }
};

/**
 * Pushes lead details to NoPaperForms CRM
 */
export const pushToNPF = async (leadData) => {
    const ACCESS_KEY = process.env.ACCESS_KEY;
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!ACCESS_KEY || !SECRET_KEY) {
        console.warn('[NPF CRM] Credentials missing in .env. Skipping lead push.');
        return false;
    }

    const email = leadData.email || '';
    const phone = leadData.phone || leadData.mobile || '';
    const cleanedPhone = phone.replace(/[^0-9]/g, '').slice(-10);

    if (!email && !cleanedPhone) {
        console.error('[NPF CRM Error] Both email and phone are missing. Cannot push lead.');
        return false;
    }

    try {
        const payload = {
            country_dial_code: leadData.country_dial_code || '+91',
            name: leadData.name || leadData.fullName || leadData.username || 'Lead',
            email: email,
            mobile: cleanedPhone,
            search_criteria: leadData.search_criteria || (email ? 'email' : 'mobile'),
            email_verification_status: true,
            lead_stage: 'hot',
            source: leadData.source || 'Wesbite',
            medium: leadData.medium || 'Google Ads',
            campaign: leadData.campaign || 'B2B'
        };

        // Add custom fields only if they have truthy values (not empty strings)
        if (leadData.state) payload.state = leadData.state;
        if (leadData.city) payload.city = leadData.city;
        if (leadData.course) payload.course = leadData.course;
        if (leadData.program) payload.program = leadData.program;
        
        const courseVal = leadData.course || leadData.program;
        if (courseVal) {
            payload.cf_course_of_interest = courseVal;
        }
        
        const campusVal = leadData.campus || leadData.centre || leadData.center || leadData.city;
        if (campusVal) {
            payload.campus = campusVal;
            payload.centre = campusVal;
        }
        
        const messageVal = leadData.message || leadData.subject;
        if (messageVal) payload.message = messageVal;

        const response = await axios({
            method: 'POST',
            url: 'https://api.nopaperforms.io/lead/v1/createOrUpdate',
            headers: {
                'access-key': ACCESS_KEY,
                'secret-key': SECRET_KEY,
                'Content-Type': 'application/json'
            },
            data: payload,
            timeout: 10000 // 10s timeout
        });

        if (response.data && response.data.status === true) {
            console.log(`[NPF CRM] Lead pushed successfully for ${email || cleanedPhone}. Lead ID: ${response.data.data?.lead_id}`);
            return true;
        } else {
            console.error(`[NPF CRM Error] API Rejected: ${JSON.stringify(response.data)}`);
            return false;
        }
    } catch (err) {
        const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
        console.error(`[NPF CRM Error] Failed to push lead:`, errorMsg);
        return false;
    }
};
