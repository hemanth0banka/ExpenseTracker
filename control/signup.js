const service = require('../service/signup.js')
const handle = require('../util/handle.js')
const postControl = async (req, res, next) => {
    try {
        let { username, email, phone, password } = req.body
        let d = await service.postService(username, email, phone, password)
        handle.success(res, 'user Created Successfully', 201, d)
    }
    catch (e) {
        next(e)
    }

}
module.exports = { postControl }