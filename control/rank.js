const service = require('../service/rank.js')
const handle = require('../util/handle.js')
const getControl = async (req, res, next) => {
    try {
        let d = await service.getService()
        handle.success(res, 'users list', 200, d)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { getControl }