const { MongoClient, ServerApiVersion } = require("mongodb");

let client = null;
let database = null;

async function connectToDatabase() {
  if (database) {
    return database;
  }

  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "careerTracker";

  if (!mongoUri) {
    console.warn("MONGO_URI not set. Using in-memory development storage.");
    return null;
  }

  client = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  database = client.db(dbName);

  await Promise.all([
    database.collection("users").createIndex({ email: 1 }, { unique: true }),
    database.collection("jobs").createIndex({ createdAt: -1 }),
    database.collection("jobs").createIndex({ status: 1, companyName: 1, role: 1 }),
    database.collection("applications").createIndex({ userId: 1, appliedAt: -1 }),
    database.collection("applications").createIndex(
      { userId: 1, jobId: 1 },
      { unique: true }
    ),
  ]);

  console.log(`MongoDB connected to database "${dbName}"`);
  return database;
}

function getDatabase() {
  return database;
}

module.exports = {
  connectToDatabase,
  getDatabase,
};
