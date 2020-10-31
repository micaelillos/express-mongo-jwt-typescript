import express = require('express');
import verify from './verifyToken';
const router = express.Router();

const Post = require('../models/Posts');

// Routes
//get All posts
router.get('/', verify, async (req: any, res) => {
  try {
    const allposts = await Post.find();
    res.json({ user: req.user, allposts });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Add post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
