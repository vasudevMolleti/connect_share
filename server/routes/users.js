
const express = require('express');
const router = express.Router();

// Mock user data - in a real app, this would be in a database
const users = [
  {
    id: "101",
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/placeholder.svg",
    email: "sarah@example.com",
    bio: "Digital creator and photography enthusiast",
    followers: 325,
    following: 150,
    posts: 42
  },
  {
    id: "102",
    name: "Alex Thompson",
    username: "alexthompson",
    avatar: "/placeholder.svg",
    email: "alex@example.com",
    bio: "Travel blogger | Adventure seeker",
    followers: 1240,
    following: 567,
    posts: 128
  },
  {
    id: "103",
    name: "Mike Chen",
    username: "mikechen",
    avatar: "/placeholder.svg",
    email: "mike@example.com",
    bio: "Software developer and tech enthusiast",
    followers: 528,
    following: 235,
    posts: 78
  }
];

// Get a user profile
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const userProfile = {
    id: user.id,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    posts: user.posts
  };
  
  res.json(userProfile);
});

// Update user profile
router.put('/:id', (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // In a real app, we would validate the authenticated user
  
  if (name) user.name = name;
  if (bio) user.bio = bio;
  if (avatar) user.avatar = avatar;
  
  res.json({
    id: user.id,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    bio: user.bio
  });
});

// Follow a user
router.post('/:id/follow', (req, res) => {
  const userToFollow = users.find(u => u.id === req.params.id);
  
  if (!userToFollow) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // In a real app, we would validate the authenticated user
  // and check if they are already following this user
  
  userToFollow.followers += 1;
  
  res.json({ success: true, followers: userToFollow.followers });
});

// Search users
router.get('/', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }
  
  const query = q.toLowerCase();
  const results = users
    .filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.username.toLowerCase().includes(query))
    .map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar
    }));
  
  res.json(results);
});

module.exports = router;
