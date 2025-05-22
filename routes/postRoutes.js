const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Notification = require('../models/notification');

router.post('/', async (req, res) => {
  const { userId, content } = req.body;
  try {
    const post = await Post.create({ userId, content });
    const user = await User.findById(userId);

    if (user && user.followers) {
      const notifications = user.followers.map(followerId => ({
        userId: followerId,
        message: `${user.name} posted: ${content.substring(0, 50)}...`,
        timestamp: new Date()
      }));
      await Notification.insertMany(notifications);
    }

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* get posts by userid if you want to use this
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('error gettin user posts:', err);
    res.status(500).json({ error: err.message });
    message = res.body.message
  }
});
*/

module.exports = router;
