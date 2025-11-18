const dotenv = require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const compression = require('compression')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const sequelize = require('./util/db.js')
const login = require('./route/login.js')
const signup = require('./route/signup.js')
const expenses = require('./route/expenses')
const ai = require('./route/ask.js')
const pro = require('./route/pro.js')
const rank = require('./route/rank.js')
const progress = require('./route/progress.js')
const forgot = require('./route/forgot.js')
const download = require('./route/download.js')
const tokenValidator = require('./middlewares/tokenValidator.js')
const errorHandler = require('./middlewares/errorHandler.js')
const port = 1000
const logs = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
require('./model/model.js')
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(morgan('combined', { stream: logs }))
app.use(compression())
console.log('Server is Running...')
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'pages', 'login.html'))
})
app.get('/home', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'pages', 'home.html'))
})
app.use('/login', login)
app.use('/signup', signup)
app.use('/forgot', forgot)
app.use(tokenValidator)
app.use('/expenses', expenses)
app.use('/pro', pro)
app.use('/ask', ai)
app.use('/rank', rank)
app.use('/progress', progress)
app.use('/download', download)
app.use((req, res, next) => {
    const error = new Error('page not found')
    error.statusCode = 404
    next(error)
});
app.use(errorHandler);
(async () => {
    try {
        await sequelize.sync({ alter: true })
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`)
        })
    }
    catch (e) {
        console.log(e)
    }
})()