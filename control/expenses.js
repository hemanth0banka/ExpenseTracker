const service = require('../service/expenses.js')
const handle = require('../util/handle.js')
const getControl = async (req,res)=>{
    try{
        const {limit,page} = req.body
        let token = req.headers.authorization?.split(' ')[1]
        let obj = await  service.getService(token,limit,page)
        handle.success(res,'success',200,obj)
    }
    catch(e){
        handle.error(res,e,500)
    }
}
const postControl = async (req,res)=>{
    try{
        const {amount,description,category} = req.body
        let token = req.headers.authorization?.split(' ')[1]
        let obj = await  service.postService(token,amount,description,category)
        handle.success(res,'success',200,obj)
    }
    catch(e){
        handle.error(res,e,500)
    }
}
const deleteControl = async (req,res)=>{
    try{
        const {amount,id} = req.body
        let token = req.headers.authorization?.split(' ')[1]
        let obj = await  service.deleteService(token,id,amount)
        handle.success(res,'success',200,obj)
    }
    catch(e){
        handle.error(res,e,500)
    }
}
module.exports = {getControl,postControl,deleteControl}