const service = require('../service/login.js')
const handle = require('../util/handle.js')
const postControl = async (req, res, next) => {
    try {
        let { username, password } = req.body
        let token = await service.postService(username, password)
        handle.success(res, 'login success', 200, token)
    }
    catch (e) {
        next(e)
    }

}
module.exports = { postControl }