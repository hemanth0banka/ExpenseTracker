const service = require('../service/login.js')
const handle = require('../util/handle.js')
const postControl = async (req, res) => {
    try {
        let { username,password } = req.body
        let token = await service.postService(username, password)
        handle.success(res,'login success', 200, token)
    }
    catch (e) {
        handle.error(res, e.message || 'Internal Server Error', e.statusCode || 500)
    }

}
module.exports = { postControl }