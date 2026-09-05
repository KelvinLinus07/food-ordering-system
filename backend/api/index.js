// Vercel serverless entry point.
//
// Vercel builds every file under /api into its own serverless function.
// This file simply re-exports the existing Express app from server.js so
// the exact same routes/controllers/middleware run on Vercel as they do
// locally — nothing about the app itself changes for deployment.
module.exports = require("../server");
