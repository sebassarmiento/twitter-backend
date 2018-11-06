const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    tweet: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    date: { type: Number, required: true }
})

module.exports = mongoose.model('Tweet', tweetSchema)