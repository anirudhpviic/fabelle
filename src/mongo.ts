import mongoose from 'mongoose';

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// This is included to avoid warnings for Mongoose 7. See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// Function to connect to the database
async function connectDB(): Promise<void> {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(uri);
    console.log('Connection Successful to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

export { connectDB };