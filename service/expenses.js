const data = require('../model/data.js')
const users = require('../model/users.js')
const getService = async (t, l, p) => {
    try {
        let limit = Number(l)
        let page = Number(p)
        const offset = page * limit
        let d = await data.findAndCountAll({
            where: {
                userUserId: t.userId
            },
            limit: limit,
            offset: offset
        })
        const obj = {
            expenses: d.rows,
            prev: page,
            current: page + 1,
            next: page + 2,
            last: Math.ceil(d.count / limit)
        }
        return obj
    }
    catch (e) {
        throw e
    }
}
const postService = async (token, a, d, c) => {
    try {
        let newExpense = await data.create({
            amount: a,
            description: d,
            category: c,
            userUserId: token.userId
        })
        let user = await users.findOne({
            where: {
                userId: token.userId
            }
        })
        user.total += Number(a)
        await user.save()
        return newExpense
    }
    catch (e) {
        throw e
    }
}
const deleteService = async (token, id, a) => {
    try {
        let d = await data.destroy({
            where: {
                id: id
            }
        })
        let user = await users.findOne({
            where: {
                userId: token.userId
            }
        })
        user.total -= Number(a)
        await user.save()
        return 'ok'
    }
    catch (e) {
        throw e
    }
}
module.exports = { getService, postService, deleteService }