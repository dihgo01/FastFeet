const { Model, Sequelize } = require('sequelize');

class Recipient extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            street: Sequelize.STRING,
            number: Sequelize.INTEGER,
            complement: Sequelize.STRING,
            state: Sequelize.BOOLEAN,
            city: Sequelize.STRING,
            zipCode: Sequelize.INTEGER,
        }, {
            sequelize,
            tableName: 'recipients'
        })
    }
}
module.exports = Recipient