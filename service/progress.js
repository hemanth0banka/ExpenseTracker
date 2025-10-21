const data = require('../model/data.js')
const jwt = require('jsonwebtoken')
const postService = async (t, start, end) => {
    try {
        let token = jwt.verify(t, process.env.securitykey)
        let d = await data.findAll({
            where: {
                userUserId: token.userId
            },
            between: ['createdAt', [start, end]]
        })
        return d
    }
    catch (e) {
        throw e
    }
}
module.exports = { postService }