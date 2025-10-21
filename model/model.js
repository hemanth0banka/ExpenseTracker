const users = require('./users.js')
const data = require('./data.js')
const payment = require('./payment.js')
const request = require('./request.js')
const downloads = require('./downloads.js')

users.hasMany(data)
data.belongsTo(users)

users.hasMany(payment)
payment.belongsTo(users)

users.hasMany(request)
request.belongsTo(users)

users.hasMany(downloads)
downloads.belongsTo(users)

module.exports = { users, data , payment , downloads}