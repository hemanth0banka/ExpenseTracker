const {DataTypes} = require('sequelize')
const sequelize = require('../util/db.js')
const request = sequelize.define('request',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    uuid : {
        type : DataTypes.STRING,
        allowNull : false
    },
    active : {
        type : DataTypes.BOOLEAN,
    },
})
module.exports = request