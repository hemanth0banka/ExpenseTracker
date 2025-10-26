const data = require('../model/data.js') 
const jwt = require('jsonwebtoken') 
const { Op } = require('sequelize')
const postService = async (t, start, end) => {
  try {
    const token = jwt.verify(t, process.env.securitykey)
    const startDate = new Date(start)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(end)    
    endDate.setHours(23, 59, 59, 999) 

    const d = await data.findAll({
      where: {
        userUserId: token.userId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    })

    return d
  } catch (e) {
    throw e
  }
}
module.exports = {postService}