const success = (res,m,s,d)=>{
    res.status(s).json({
        message : m,
        data : d
    })
}
const error = (res,e,s)=>{
    res.status(s).json({
        message : e
    })
}
module.exports = {success,error}