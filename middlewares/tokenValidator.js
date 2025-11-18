const jwt = require('jsonwebtoken')
const tokenValidator = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).send('token is missing')
        }
        const decode = jwt.verify(token, process.env.securitykey)
        req.user = decode
        next()
    }
    catch (e) {
        const error = new Error('Invalid token')
        error.statusCode = 401
        next(error)
    }
}
module.exports = tokenValidator