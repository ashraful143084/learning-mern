const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const configureApp = require("./settings/config.js");
const { fixSparseUniqueIndex } = require("./settings/fixSparseUniqueIndex.js");

const app = express();

// Load env vars
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const port = parseInt(process.env.PORT) || 3000;

// Check for required environment variables
if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
  console.error(
    "❌ Missing DATABASE_URL or DATABASE_NAME in environment variables."
  );
  process.exit(1);
}

// Middleware
app.use(express.json());
configureApp(app);

// Bootstrap function
async function bootstrap() {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    // Fix indexes
    await fixSparseUniqueIndex("users", "secondaryEmail");
    await fixSparseUniqueIndex("authors", "authorEmail");
    await fixSparseUniqueIndex("reviewers", "reviewerEmail");

    // Start server
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🔥 App is running on port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start application:", error.message);
    process.exit(1);
  }
}

bootstrap();
