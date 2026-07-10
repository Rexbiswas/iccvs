import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testEmail() {
  console.log('--- SMTP Diagnostic ---');
  console.log('Email:', process.env.GOOGLE_EMAIL);
  console.log('Password (len):', process.env.GOOGLE_APP_PASSWORD ? process.env.GOOGLE_APP_PASSWORD.length : 0);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  try {
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection successful! Your credentials are correct.');
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error Code:', error.code);
    console.error('Response:', error.response);
    console.error('\n--- TROUBLESHOOTING ---');
    console.error('1. Go to https://myaccount.google.com/apppasswords');
    console.error('2. Delete the old "ryhahusnajfwylog" password if it exists.');
    console.error('3. Generate a NEW App Password (select "Other" and name it "ICCVS Website").');
    console.error('4. Copy the new 16-character code and update GOOGLE_APP_PASSWORD in .env');
    console.error('5. If you are on Vercel, update it in Vercel Settings > Environment Variables.');
  }
}

testEmail();
