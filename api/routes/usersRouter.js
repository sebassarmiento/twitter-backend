const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validAuth = require('../middleware/validToken');

router.get('/', (req, res) => {
    console.log('GET')
    User.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

router.get('/:userId' ,(req, res) => {
    User.findById(req.params.userId)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json({
                message: "User was not found",
                error: err
            })
        })
})

router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(result => {
            if (result) {
                return res.status(422).json({
                    message: "Email is already taken"
                })
            } else {
                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            tweets: 0,
                            following: 0,
                            followers: 0
                        })
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: "Created user successfully",
                                    user: result
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Could not create user",
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Invalid login data",
                            error: err
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id
                        }, 'secret', {
                                expiresIn: "1h"
                            })
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token,
                            userId: user.id,
                            username: user.username
                        })
                    }
                    res.status(401).json({
                        message: "Login failure"
                    })
                })
            } else {
                res.status(401).json({
                    message: "Login failure"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Invalid login data sale por el catch",
                error: err
            })
        })
})

module.exports = router