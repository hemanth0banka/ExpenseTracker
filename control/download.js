const handle = require('../util/handle.js')
const service = require('../service/download.js')
const getControl = async (req, res, next) => {
    try {
        const d = await service.getService(req.user)
        handle.success(res, 'success', 200, d)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { getControl }