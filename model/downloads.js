const {DataTypes} = require('sequelize')
const sequelize = require('../util/db.js')
const downloads = sequelize.define('downloads',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    urls : {
        type : DataTypes.STRING,
        allowNull : false
    }
})
module.exports = downloads