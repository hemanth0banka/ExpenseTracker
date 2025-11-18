const bcrypt = require('bcrypt')
const users = require('../model/users.js')
const postService = async (username, email, phone, pass) => {
    try {
        let password = await bcrypt.hash(pass, 10)
        let user = await users.findOne({
            where: {
                email
            }
        })
        if (user) {
            const err = new Error('user exists')
            err.statusCode = 400
            throw err
        }
        let r = await users.create({ username, email, phone, password })
        return r
    } catch (e) {
        throw e
    }
}
module.exports = { postService }