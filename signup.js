const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config({ path: '.env1' });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse JSON bodies

// MongoDB connection URI from .env file
const uri = process.env.MONGO_URI;

// Check if URI is valid
if (!uri) {
  console.error('MongoDB URI is missing!');
  process.exit(1);
}

let db;

// Connect to MongoDB
MongoClient.connect(uri)
  .then(client => {
    db = client.db('aamirnew');  // Replace with your actual database name
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// API endpoint to handle signup
app.post('/signup', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const usersCollection = db.collection('user'); // Collection to store users
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new user
    const newUser = {
      username,
      email,
      password,  // In a real app, hash the password before storing
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});