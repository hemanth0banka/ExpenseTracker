const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(process.env.db_name,process.env.db_username,process.env.db_password,{
    host : process.env.db_host,
    dialect : 'mysql'
});
(
    async ()=>{
        try
        {
            sequelize.authenticate()
            console.log('DataBase Connected...')
        }
        catch(e)
        {
            console.log(e)
        }
    }
)()
module.exports = sequelize