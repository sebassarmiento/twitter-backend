const express = require('express');
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./api/routes/usersRouter');
const tweetsRouter = require('./api/routes/tweetsRouter');

mongoose.connect('mongodb+srv://sebastian:cacafea@cluster0-ok6xa.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
        .then(() => {
        console.log("Connected to Database");
        }).catch((err) => {
            console.log("Not Connected to Database ERROR! ", err);
        })

mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(cors({credentials: true, origin: true}))

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