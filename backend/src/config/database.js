module.exports = {
    dialect:'mysql', 
    host:'localhost',
    database:'gostest', 
    username:'root',
    password:'',
    define:{
        timestamps: true,
        freezeTableName: true,
        quoteIdentifiers: false,
        operatorsAliases: false,
    },
}