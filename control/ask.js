const service = require('../service/ask.js')
const handle = require('../util/handle.js')
const getControl = async (req,res)=>{
    try
    {
        let token = req.headers.authorization?.split(' ')[1]
        let r = await service.getService(token,req.body.prompt)
        handle.success(res,'prompt response by ai',200,r)
    }
    catch(e)
    {
        handle.error(res,e,500)
    }
}
module.exports = {getControl}