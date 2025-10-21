const express = require('express')
const route = express.Router()
const control = require('../control/pro.js')
route.get('/',control.getControl)
route.get('/buy/:orderId',control.status)
route.post('/buy',control.postControl)
module.exports = route