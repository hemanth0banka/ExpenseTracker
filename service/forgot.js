const { v4 : uuidv4 } = require('uuid')
const users = require('../model/users.js')
const request = require('../model/request.js')
const bcrypt = require('bcrypt')
const path = require('path')
const Sib = require('sib-api-v3-sdk');
const postService = async (email)=>{
    try
    {
        const user = await users.findOne({
            where : {
                email : email
            }
        })
        if(!user)
        {
            throw 'no user with that email'
        }
        let id = uuidv4()
        const r = await request.create({
            uuid : id,
            active : true,
            userUserId : user.userId
        })

        const link = `http://13.232.69.212/forgot/${id}`

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.SibapiKey;
        const emailapi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: process.env.SIB_SENDER_EMAIL ,
        }
        const receivers = [
            {
                email: email
            }
        ]
        let info = await emailapi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Password Reset Link',
            textContent: `Your password reset link is here: ${link}`
        })
        console.log(info)
        return info
    }
    catch(e)
    {
        console.log(e)
    }
}
const getService = async (id)=>{
    try
    {
        const result = await request.findOne({
            where : {
                uuid : id
            }
        })
        let t = new Date(Date.now() - (1000 * 60 * 5))
        if(!result)
        {
            throw path.join(__dirname,'../views','404.html')
        }
        if(result.active == false)
        {
            throw path.join(__dirname,'../views','404.html')
        }
        if(result.createdAt < t)
        {
            throw path.join(__dirname,'../views','404.html')
        }
        result.active = false
        await result.save()
        return path.join(__dirname,'../views','reset.html')
    }
    catch(e)
    {
        throw e
    }
}
const putService = async (id,pass)=>{
    try
    {
        const password = await bcrypt.hash(pass,10)
        const result = await request.findOne({
            where : {
                uuid : id
            }
        })
        const user = await users.findOne({
            where : {
                userId : result.userUserId
            }
        })
        user.password = password
        await user.save()
        return 'password updated'
    }
    catch(e)
    {
        throw e
    }
}
module.exports = {postService,getService,putService}