const service = require('../service/pro.js')
const handle = require('../util/handle.js')
const payment = require('../model/payment.js')
const users = require('../model/users.js')
const jwt = require('jsonwebtoken')
const getControl = async (req, res, next) => {
    try {
        let d = await service.getService(req.user)
        handle.success(res, 'this is the info', 200, d)
    }
    catch (e) {
        next(e)
    }
}
const postControl = async (req, res, next) => {
    try {
        const orderAmount = 2000;
        const orderCurrency = "INR"
        const orderId = 'ORDER-' + Date.now()
        const customer_phone = "9876543210"
        let cashfreeResponse = await service.postService(req.user, orderAmount, orderCurrency, orderId, customer_phone)
        await payment.create({
            orderId,
            paymentSessionId: cashfreeResponse.payment_session_id,
            orderAmount,
            orderCurrency,
            paymentStatus: 'pending',
            userUserId: token.userId
        })
        handle.success(res, 'this is the info', 200, { paymentSessionId: cashfreeResponse.payment_session_id, orderId })
    }
    catch (e) {
        next(e)
    }
}
const status = async (req, res, next) => {
    try {
        let orderId = req.params.orderId
        let r = await service.statusService(orderId)
        let order = await payment.findOne({
            where: {
                orderId: orderId
            }
        })

        let user = await users.findOne({
            where: {
                userId: order.userUserId
            }
        })
        order.paymentStatus = r
        await order.save()
        user.pro = true
        await user.save()
        handle.success(res, 'Payment status updated', 200, r)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { getControl, postControl, status }