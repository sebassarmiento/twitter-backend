const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    tweet: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Number, required: true },
    favs: Number,
    retweet: Boolean,
    retweetUsername: String 
})

module.exports = mongoose.model('Tweet', tweetSchema)