const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../model/users.js')
const postService = async (username, pass) => {
    try {
        let r = await users.findOne({
            where: {
                email: username
            }
        })
        if (!r) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(pass, r.password);
        if (isPasswordValid) {
            const token = jwt.sign({ username: r.username, userId: r.userId }, process.env.securitykey);
            return token;
        } else {
            const error = new Error('User not authorized');
            error.statusCode = 401;
            throw error;
        }
    }
    catch (e) {
        
        throw e
    }
}
module.exports = { postService }