const express = require('express')
const route = express.Router()
const control = require('../control/progress.js')
route.post('/', control.postControl)
module.exports = route