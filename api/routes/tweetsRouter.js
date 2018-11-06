const express = require('express');
const router = express.Router()

const Tweet = require('../models/tweet');

const validToken = require('../middleware/validToken');

router.get('/', validToken,(req, res) => {
    Tweet.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

router.post('/', validToken,(req, res) => {
    const tweet = new Tweet({
        tweet: req.body.tweet,
        username: req.body.username,
        userId: req.body.userId,
        date: Date.now()
    })
    tweet.save()
    .then(result => {
        res.status(201).json({
            message: "Posted tweet successfully",
            tweet: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Could not post tweet",
            error: err
        })
    })
})

module.exports = router
