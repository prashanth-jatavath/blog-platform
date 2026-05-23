const express = require('express');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add Comment
router.post('/:postId', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      user: req.user.id,
      post: req.params.postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Comments for a Post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;