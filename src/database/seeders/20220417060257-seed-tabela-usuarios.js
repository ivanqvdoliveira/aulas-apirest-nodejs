'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Administrador',
      email: 'administrador@gmail.com',
      senha: '69492ca198d5a124fedc1823f5f864d5',
      idPerfil: 1,
      dataInativacao: null
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios');
  }
};
