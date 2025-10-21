const service = require('../service/rank.js')
const handle = require('../util/handle.js')
const getControl = async (req,res)=>{
    try
    {
        let d = await service.getService()
        handle.success(res,'users list',200,d)
    }
    catch(e)
    {
        handle.error(res,e,500)
    }
}
module.exports = {getControl}