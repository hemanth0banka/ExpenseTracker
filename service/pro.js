const { Cashfree, CFEnvironment } = require("cashfree-pg"); 
const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");
const users = require('../model/users.js')
const getService = async (token) => {
    try {
        let user = await users.findOne({
            where: {
                userId: token.userId
            }
        })
        return [user.pro,user.username]
    }
    catch (e) {
        throw e
    }
}
const postService = async (t,a,c,i,p)=>{
    try
    {
        var request = {
            "order_amount": a,
            "order_currency": c,
            "order_id": i,
            "customer_details": {
                "customer_id": String(t.userId),
                "customer_phone": p
            },
            "order_meta": {
                "return_url": `http://3.111.53.35/pro/buy/${i}`,
                "payment_methods": "cc,dc,upi"
            },
            "order_expiry_time": new Date(Date.now() + 1000 *60 *60).toISOString()
        };

        let response = await cashfree.PGCreateOrder(request)
        console.log('Order created successfully:',response.data);
        return response.data
    }
    catch(e)
    {
        console.error('Error:', e.response.data.message);
            throw e
    }
}

const statusService = async (id)=>{
    try
    {
        const response = await cashfree.PGOrderFetchPayments( id)
        let getOrderResponse = response.data;
        let orderStatus;
        if (getOrderResponse.filter(transaction => transaction.payment_status === "SUCCESS").length > 0) {
            orderStatus = "Success"
        } else if (getOrderResponse.filter(transaction => transaction.payment_status === "PENDING").length > 0) {
            orderStatus = "Pending"
        } else {
            orderStatus = "Failure"
        }
        return orderStatus
    }
    catch(e)
    {
        throw e
    }
}

module.exports = {statusService,getService,postService}