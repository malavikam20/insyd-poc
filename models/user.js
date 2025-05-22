const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  followers: [String],
  following: [String]
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model. The schema includes three fields:
// 1. `name`: A string representing the user's name.
// 2. `followers`: An array of strings representing the usernames of the user's followers.
// 3. `following`: An array of strings representing the usernames of the users that this user is following.
// The schema is then exported as a Mongoose model named 'User', which can be used to interact with the corresponding MongoDB collection.
// The `mongoose` library is used to define the schema and create the model.