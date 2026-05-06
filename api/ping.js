export default function handler(req, res) {
  res.status(200).json({
      status: "alive",
      env_keys_found: Object.keys(process.env).filter(key => 
        key.includes('MONGO') || 
        key.includes('GOOGLE') || 
        key.includes('VERCEL')
      ),
      checks: {
          has_mongo_uri: !!process.env.MONGO_URI,
          has_google_email: !!process.env.GOOGLE_EMAIL,
          has_google_pass: !!process.env.GOOGLE_APP_PASSWORD,
          node_version: process.version
      },
      message: process.env.MONGO_URI ? "Variables are FOUND." : "Variables are MISSING. Double check Vercel Settings."
  });
}
