const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
        super.init({
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          password: Sequelize.VIRTUAL,
          password_hash: Sequelize.STRING,
          admin: Sequelize.BOOLEAN,
        },{
         sequelize,
        tableName:'user'
        })

        this.addHook('beforeSave', async (user) => {
          if(user.password){
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        });

      return this;
     }
}
module.exports = User