const jwt = require('jsonwebtoken')
const ai = require('../ai.js')
const getService= async (token,prompt)=>{
    try
    {
        let t = jwt.verify(token,process.env.securitykey)
        let response = await ai(prompt)
        return response
    }
    catch(e)
    {
        throw e
    }
}
module.exports = { getService }