export default function handler(req, res) {
  res.status(200).json({
      status: "alive",
      checks: {
          has_mongo_uri: !!process.env.MONGO_URI,
          has_google_email: !!process.env.GOOGLE_EMAIL,
          has_google_pass: !!process.env.GOOGLE_APP_PASSWORD,
          node_version: process.version
      },
      message: process.env.MONGO_URI ? "Variables are FOUND. If it still fails, check your DB password." : "Variables are MISSING. Please add them to Vercel Settings."
  });
}
