const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name');

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});