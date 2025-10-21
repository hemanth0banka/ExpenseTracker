const sequelize = require('../util/db.js')
const d = require('../model/data.js')
const jwt = require('jsonwebtoken')
const downloads = require('../model/downloads.js')
const {S3} = require('aws-sdk')
const getService = async (t)=>{
    let trans = await sequelize.transaction()
    try
    {
        const token = jwt.verify(t,process.env.securitykey)
        const r = await d.findAll({
            where : {
                userUserId : token.userId
            },
            transaction : trans
        })
        const s3 = new S3({accessKeyId : process.env.aws_accesskey , secretAccessKey : process.env.aws_secretkey })
        const params = {
            Bucket : process.env.aws_bucket,
            Key : `Expenses/${token.userId}/${new Date().toISOString()}.txt`,
            Body : JSON.stringify(r),
            ACL : 'public-read'
        }
        const response = await s3.upload(params).promise()
        const result = await downloads.create({
            urls : response.Location,
            userUserId : token.userId,
        },{ transaction: trans })
        await trans.commit()
        return response
    }
    catch(e)
    {
        await trans.rollback()
        throw e
    }
}
module.exports = {getService}