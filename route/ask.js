const express = require('express')
const route = express.Router()
const control = require('../control/ask.js')
route.post('/',control.getControl)
module.exports = route