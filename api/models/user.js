const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    retweetsCount: Number,
    tweets: Number,
    following: Number,
    followers: Number,
    favs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]
})

module.exports = mongoose.model('User', userSchema)