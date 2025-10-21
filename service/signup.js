const bcrypt = require('bcrypt')
const users = require('../model/users.js')
const postService = async (username, email, phone, pass) => {
    try {
        let password = await bcrypt.hash(pass, 10)
        let r = await users.create({ username, email, phone, password })
        return r
    } catch (e) {
        throw e
    }
}
module.exports = { postService }