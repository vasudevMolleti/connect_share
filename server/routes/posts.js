
const express = require('express');
const router = express.Router();

// Mock data - in a real app, this would come from a database
const posts = [
  {
    id: "1",
    author: {
      id: "101",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder.svg"
    },
    content: "Just launched my new project! Check it out and let me know what you think.",
    image: "https://source.unsplash.com/random/1080x720/?project",
    likes: 24,
    comments: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "2",
    author: {
      id: "102",
      name: "Alex Thompson",
      username: "alexthompson",
      avatar: "/placeholder.svg"
    },
    content: "Beautiful sunset at the beach today. Nature never fails to amaze me.",
    image: "https://source.unsplash.com/random/1080x720/?sunset,beach",
    likes: 57,
    comments: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  }
];

// Get all posts (with pagination)
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {};
  
  if (endIndex < posts.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  
  results.posts = posts.slice(startIndex, endIndex);
  
  res.json(results);
});

// Get a single post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});

// Create a new post
router.post('/', (req, res) => {
  const { content, image } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  // In a real app, we would validate the user from the auth token
  const newPost = {
    id: Date.now().toString(),
    author: {
      id: "101",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder.svg"
    },
    content,
    image,
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString()
  };
  
  posts.unshift(newPost); // Add to beginning of array
  
  res.status(201).json(newPost);
});

// Like a post
router.put('/:id/like', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  post.likes += 1;
  
  res.json({ likes: post.likes });
});

// Add a comment to a post
router.post('/:id/comment', (req, res) => {
  const { content } = req.body;
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }
  
  post.comments += 1;
  
  // In a real app, we would actually store the comment in a database
  
  res.status(201).json({ success: true, commentCount: post.comments });
});

module.exports = router;
