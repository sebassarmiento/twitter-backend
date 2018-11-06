const express = require('express');
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./api/routes/usersRouter');
const tweetsRouter = require('./api/routes/tweetsRouter');

mongoose.connect('mongodb://localhost:27017/camada3420', {useNewUrlParser: true})

mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/tweets', tweetsRouter)


app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
})

module.exports = app