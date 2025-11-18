const handle = require('../util/handle.js')
const service = require('../service/progress.js')
const postControl = async (req, res, next) => {
    try {
        const { start, end } = req.body
        const response = await service.postService(req.user, start, end)
        handle.success(res, 'list of progress', 200, response)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { postControl }