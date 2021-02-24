module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('user', [{
        name: 'admin',
        password_hash: '1234567',
        email: 'admin@admin.com.br',
        admin: true
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('user', null, {});
     
  }
};
