const { Model, Sequelize } = require('sequelize');

class User extends Model {
  static init(sequelize) {
        super.init({
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          password: Sequelize.STRING,
        },{
         sequelize,
        tableName:'user'
        })
     }
}
module.exports = User