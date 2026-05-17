import { MongoClient } from "mongodb";

const uri = process.env.PROD_DB_STRING;

if (!uri) {
  throw new Error("❌ PROD_DB_STRING not defined");
}

// Updated options for free cluster stability
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000, // 30s instead of 10s
  socketTimeoutMS: 45000,          // optional, increase socket timeout
  connectTimeoutMS: 30000,         // connection timeout
};

let client;
let clientPromise;

// Global cache for Next.js (prevents multiple connections)
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);

  // Retry function
  const connectWithRetry = async (retries = 5, delay = 5000) => {
    try {
      await client.connect();
      console.log("✅ MongoDB connected");
      return client;
    } catch (err) {
      console.error(`❌ MongoDB connection failed. Retries left: ${retries}`, err);
      if (retries <= 0) throw err;
      // wait before retrying
      await new Promise(res => setTimeout(res, delay));
      return connectWithRetry(retries - 1, delay);
    }
  };

  global._mongoClientPromise = connectWithRetry();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
