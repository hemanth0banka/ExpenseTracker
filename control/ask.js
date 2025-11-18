const handle = require('../util/handle.js')
const ai = require('../ai.js')
const getControl = async (req, res, next) => {
    try {
        let r = await ai(req.body.prompt)
        handle.success(res, 'prompt response by ai', 200, r)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { getControl }