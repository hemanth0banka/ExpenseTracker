const handle = require('../util/handle.js')
const service = require('../service/download.js')
const getControl = async (req,res)=>{
    try
    {
        const token = req.headers.authorization?.split(' ')[1]
        const d = await service.getService(token)
        handle.success(res,'success',200,d)
    }
    catch(e)
    {
        handle.error(res,e,500)
    }
}
module.exports = {getControl}