const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    tweets: Number,
    following: Number,
    followers: Number
})

module.exports = mongoose.model('User', userSchema)