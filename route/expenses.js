const express = require('express')
const route = express.Router()
const control = require('../control/expenses.js')
route.post('/', control.getControl)
route.post('/add',control.postControl)
route.delete('/',control.deleteControl)
module.exports = route