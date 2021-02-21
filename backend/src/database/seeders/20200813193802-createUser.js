module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('user', [{
        name: 'admin',
        password: '1234567',
        email: 'admin@admin.com.br'
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('user', null, {});
     
  }
};
