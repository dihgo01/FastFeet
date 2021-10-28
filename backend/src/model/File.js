const { Model, Sequelize } = require('sequelize');

class File extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:4000/files/${this.path}`;
                },
            },
        },
        {
           sequelize,
           tableName: 'files'
         } );
        
         return this;
    }
}
module.exports = File