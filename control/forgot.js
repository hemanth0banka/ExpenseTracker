const service = require('../service/forgot.js')
const handle = require('../util/handle.js')
const postControl = async (req, res, next) => {
    try {
        const { email } = req.body
        let a = await service.postService(email)
        handle.success(res, 'success', 200, a)
    }
    catch (e) {
        next(e)
    }
}
const getControl = async (req, res, next) => {
    try {
        const { uuid } = req.params
        const a = await service.getService(uuid)
        res.status(200).sendFile(a)
    }
    catch (e) {
        next(e)
    }
}
const putControl = async (req, res, next) => {
    try {
        const { uuid } = req.params
        const { password } = req.body
        let a = await service.putService(uuid, password)
        handle.success(res, 'success', 200, a)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { postControl, getControl, putControl }