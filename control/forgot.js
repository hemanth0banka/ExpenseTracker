const service = require('../service/forgot.js')
const handle = require('../util/handle.js')
const postControl = async (req,res)=>{
    try
    {
        const {email} = req.body
        let a = await service.postService(email)
        handle.success(res,'success',200,a)
    }
    catch(e)
    {
        handle.error(res,e,500)
    }
}
const getControl = async (req,res)=>{
    try
    {
        const {uuid} = req.params
        const a = await service.getService(uuid)
        res.status(200).sendFile(a)
    }
    catch(e)
    {
        res.status(404).sendFile(e)
    }
}
const putControl = async (req,res)=>{
    try
    {
        const {uuid} = req.params
        const {password} = req.body
        let a = await service.putService(uuid,password)
        handle.success(res,'success',200,a)
    }
    catch(e)
    {
        handle.error(res,e,500)
    }
}
module.exports = {postControl,getControl,putControl}