const { Model, Sequelize } = require('sequelize');

class Deliveryman extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            avatarId: Sequelize.INTEGER,
        }, {
            sequelize,
            tableName: 'deliverymans'
        })
    }

    static associate(File) {
        this.belongsTo(File, { foreignKey:'avatarId', as: 'avatar' });
    }
}
module.exports = Deliveryman