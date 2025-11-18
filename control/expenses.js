const service = require('../service/expenses.js')
const handle = require('../util/handle.js')
const getControl = async (req, res, next) => {
    try {
        const { limit, page } = req.body
        let obj = await service.getService(req.user, limit, page)
        handle.success(res, 'success', 200, obj)
    }
    catch (e) {
        next(e)
    }
}
const postControl = async (req, res, next) => {
    try {
        const { amount, description, category } = req.body
        let obj = await service.postService(req.user, amount, description, category)
        handle.success(res, 'success', 200, obj)
    }
    catch (e) {
        next(e)
    }
}
const deleteControl = async (req, res, next) => {
    try {
        const { amount, id } = req.body
        let obj = await service.deleteService(req.user, id, amount)
        handle.success(res, 'success', 200, obj)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { getControl, postControl, deleteControl }