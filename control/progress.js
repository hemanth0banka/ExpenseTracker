const handle = require('../util/handle.js')
const service = require('../service/progress.js')
const postControl = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const { start, end } = req.body
        const response = await service.postService(token, start, end)
        handle.success(res, 'list of progress', 200, response)
    }
    catch (e) {
        handle.error(res, e, 500)
    }
}
module.exports = { postControl }