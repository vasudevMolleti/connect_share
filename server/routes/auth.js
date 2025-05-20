
const express = require('express');
const router = express.Router();

// Mock user data - in a real app, this would be in a database
const users = [
  {
    id: "101",
    name: "Sarah Johnson",
    username: "sarahj",
    email: "sarah@example.com",
    password: "password123" // In a real app, this would be hashed
  }
];

// Register a new user
router.post('/register', (req, res) => {
  const { name, username, email, password } = req.body;
  
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already in use' });
  }
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already taken' });
  }
  
  const newUser = {
    id: Date.now().toString(),
    name,
    username,
    email,
    password // In a real app, this would be hashed
  };
  
  users.push(newUser);
  
  // In a real app, we would generate and return a JWT token
  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email
    },
    token: "mock-jwt-token"
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // In a real app, we would generate and return a JWT token
  res.json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    },
    token: "mock-jwt-token"
  });
});

// Google OAuth - mock endpoint
router.post('/google', (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'Google token is required' });
  }
  
  // In a real app, we would verify the token with Google
  
  res.json({
    user: {
      id: "google-user-123",
      name: "Google User",
      username: "googleuser",
      email: "google@example.com"
    },
    token: "mock-jwt-token"
  });
});

module.exports = router;
