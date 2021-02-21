module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('user', {
       id: { 
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
       name:{ 
        type: Sequelize.STRING,
        allowNull: false,
      },
       email:{ 
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
       password:{ 
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt:{ 
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt:{ 
        type: Sequelize.DATE,
        allowNull: false,
      },
      });
    
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('user');
     
  }
};
