const users = require('../model/users.js')
const getService = async ()=>{
    try
    {
        let result = await users.findAll(
            {
                order : [['total','DESC']]
            }
        )
        console.log(result)
        return result
    }
    catch(e)
    {
        throw e
    }
}
module.exports = {getService}