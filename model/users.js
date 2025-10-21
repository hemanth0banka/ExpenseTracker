const { DataTypes } = require('sequelize')
const sequelize = require('../util/db.js')
const users = sequelize.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    pro: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

})
module.exports = users