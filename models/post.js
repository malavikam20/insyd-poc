const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
// This code defines a Mongoose schema for a Post model. The schema includes three fields:
// 1. `userId`: A string representing the ID of the user who created the post.
// 2. `content`: A string representing the content of the post.
// 3. `timestamp`: A date field that defaults to the current date and time when the post is created.
// The schema is then exported as a Mongoose model named 'Post', which can be used to interact with the corresponding MongoDB collection.