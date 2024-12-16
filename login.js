const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '.env2' }); // Load environment variables from .env file

// Get MongoDB URI and Port from environment variables
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3001;

if (!uri) {
  console.error('MongoDB URI is not defined in the .env file');
  process.exit(1);  // Exit if the URI is not defined
}

const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.json());

// Login API endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Connect to MongoDB
    await client.connect();

    // Get the users collection
    const db = client.db('aamirnew');  // Use your database name here
    const usersCollection = db.collection('user');  // Use your collection name here

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password directly (No hashing or encryption)
    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    // Close the database connection
    await client.close();
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});