const express = require('express')
const route = express.Router()
const control = require('../control/download.js')
route.get('/',control.getControl)
module.exports = route