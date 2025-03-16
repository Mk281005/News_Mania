import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If we have cached values, use them
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Connect to MongoDB
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('newsmania');

  // Cache the client and db connections
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getUserByClerkId(clerkId) {
  const { db } = await connectToDatabase();
  return db.collection('users').findOne({ clerkId });
}

export async function updateUserData(clerkId, data) {
  const { db } = await connectToDatabase();
  return db.collection('users').updateOne(
    { clerkId },
    { $set: { ...data, updatedAt: new Date() } }
  );
}

export async function getUsers(query = {}, limit = 50) {
  const { db } = await connectToDatabase();
  return db.collection('users').find(query).limit(limit).toArray();
}