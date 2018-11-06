const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers.authorization
    if(token){
        const tokenVerified = jwt.verify(token, 'secret')
        console.log('TOKEN => ', tokenVerified)
        req.token = tokenVerified
        next()
    } else {
        res.status(401).json({
            message: "No token present on request"
        })
    }
}