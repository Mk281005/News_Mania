// For App Router (app/api/clerk-webhook/route.js)
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req) {
  // Verify the webhook signature
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error: Invalid signature', { status: 400 });
  }

  // Connect to MongoDB
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const database = client.db('newsmania');
    const usersCollection = database.collection('users');

    // Handle different event types
    const eventType = evt.type;
    console.log(`Processing ${eventType} event`);
    
    switch (eventType) {
      case 'user.created':
        await usersCollection.insertOne({
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0]?.email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          imageUrl: evt.data.image_url,
          createdAt: new Date(evt.data.created_at),
          lastSignInAt: new Date(),
        });
        console.log('User created in MongoDB');
        break;
      
      case 'user.updated':
        await usersCollection.updateOne(
          { clerkId: evt.data.id },
          { 
            $set: {
              email: evt.data.email_addresses[0]?.email_address,
              firstName: evt.data.first_name,
              lastName: evt.data.last_name,
              imageUrl: evt.data.image_url,
              updatedAt: new Date(),
            }
          },
          { upsert: true }
        );
        console.log('User updated in MongoDB');
        break;
      
      case 'user.deleted':
        await usersCollection.deleteOne({ clerkId: evt.data.id });
        console.log('User deleted from MongoDB');
        break;
        
      case 'session.created':
        await usersCollection.updateOne(
          { clerkId: evt.data.user_id },
          { $set: { lastSignInAt: new Date() } }
        );
        console.log('User session recorded in MongoDB');
        break;
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }

  return new Response('Webhook processed successfully', { status: 200 });
}