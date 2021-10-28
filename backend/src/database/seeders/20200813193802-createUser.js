const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('user', [{
        name: 'Distribuidora FastFeet',
        password_hash: bcrypt.hashSync("123456", 8),
        email: 'admin@fastfeet.com',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('user', null, {});
     
  }
};
