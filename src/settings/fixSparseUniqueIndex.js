const mongoose = require("mongoose");

async function fixSparseUniqueIndex(collectionName, fieldName) {
  const db = mongoose.connection.db;

  // Step 1: Remove null or empty string values
  await db
    .collection(collectionName)
    .updateMany(
      { $or: [{ [fieldName]: null }, { [fieldName]: "" }] },
      { $unset: { [fieldName]: "" } }
    );

  // Step 2: Drop existing index if it exists
  const indexes = await db.collection(collectionName).indexes();
  const existingIndex = indexes.find(
    (idx) => idx.key?.[fieldName] !== undefined
  );

  if (existingIndex) {
    console.log(
      `🧹 Dropping index '${existingIndex.name}' on ${collectionName}.${fieldName}`
    );
    await db.collection(collectionName).dropIndex(existingIndex.name);
  }

  // Step 3: Create sparse unique index
  console.log(
    `✅ Creating sparse unique index on ${collectionName}.${fieldName}`
  );
  await db
    .collection(collectionName)
    .createIndex({ [fieldName]: 1 }, { unique: true, sparse: true });
}

module.exports = { fixSparseUniqueIndex };
