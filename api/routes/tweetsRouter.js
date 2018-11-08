const express = require('express');
const router = express.Router()

const Tweet = require('../models/tweet');
const User = require('../models/user');

const validToken = require('../middleware/validToken');

router.get('/', validToken, (req, res) => {
    Tweet.find().sort({ date: -1 })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

router.post('/', validToken, (req, res) => {
    const tweet = new Tweet({
        tweet: req.body.tweet,
        username: req.body.username,
        userId: req.body.userId,
        date: Date.now()
    })
    tweet.save()
        .then(resultTweet => {
            // Actualizo tweets count del user
            User.findById(req.body.userId)
                .then(result => {
                    result.tweets++
                    result.save()
                        .then(updatedUser => {
                            console.log(updatedUser)
                            res.status(201).json({
                                message: "Posted tweet successfully",
                                tweet: resultTweet
                            })
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not post tweet",
                error: err
            })
        })
})


router.post('/:tweetId/retweet', (req, res) => {

    const tweet = new Tweet({
        tweet: req.body.tweet,
        username: req.body.originalUser,
        userId: req.body.userId,
        retweet: true,
        retweetUsername: req.body.retweetUsername,
        date: Date.now()
    })

    tweet.save()
    .then(result => {
        User.findById(req.body.userId)
        .then(user => {
            user.retweetsCount++
            return user.save()
        })
        .then(userSaved => {
            res.status(200).json({message: 'Retweet succesfull', tweet: result})
        })
    })
    .catch(err => {
        res.status(500).json({message: 'Could not retweet', err})
    })
})



module.exports = router
