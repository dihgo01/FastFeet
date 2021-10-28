const { Model, Sequelize } = require('sequelize');

class Order extends Model {
    static init(sequelize) {
        super.init({
            recipientId: Sequelize.INTEGER, 
            deliverymanId: Sequelize.INTEGER,
            signatureId: Sequelize.INTEGER,
            product: Sequelize.STRING,
            canceledAt: Sequelize.DATE,
            startDate: Sequelize.DATE,
            endDate: Sequelize.DATE,
        }, {
            sequelize,
            tableName: 'orders'
        })
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey:'signatureId', as: ' signature' });
        this.belongsTo(models.Deliveryman, { foreignKey:'deliverymanId', as: 'deliveryman' });
        this.belongsTo(models.Recipient, { foreignKey:'recipientId', as: 'recipient' });
    }
}
module.exports = Order