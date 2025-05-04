const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const configureApp = require("./settings/config.js");
const app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const port = parseInt(process.env.PORT);
app.use(express.json());

configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    //Fix duplicate index error problem
    const db = mongoose.connection.db;
    await db
      .collection("users")
      .updateMany({ secondaryEmail: null }, { $unset: { secondaryEmail: "" } });

    await db
      .collection("users")
      .updateMany({ secondaryEmail: "" }, { $unset: { secondaryEmail: "" } });

    console.log("🔍 Getting indexes...");
    const indexes = await db.collection("users").indexes();
    const secondaryEmailIndex = indexes.find((idx) =>
      idx.key.hasOwnProperty("secondaryEmail")
    );

    if (secondaryEmailIndex) {
      console.log("🧹 Dropping old secondaryEmail index...");
      await db.collection("users").dropIndex(secondaryEmailIndex.name);
    }

    console.log("✅ Creating new sparse unique index on secondaryEmail...");
    await db
      .collection("users")
      .createIndex({ secondaryEmail: 1 }, { unique: true, sparse: true });

    console.log("🎉 Index successfully fixed!");

    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
