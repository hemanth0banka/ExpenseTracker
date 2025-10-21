const express = require('express')
const route = express.Router()
const control = require('../control/forgot.js')
route.post('/',control.postControl)
route.get('/:uuid',control.getControl)
route.put('/:uuid',control.putControl)
module.exports = route