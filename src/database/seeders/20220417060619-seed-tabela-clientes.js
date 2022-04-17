'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [{
      nome: 'Joelma Quevedo',
      email: 'jo@gmail.com',
      cpfOuCnpj: '12345678995',
      telefone: '9587454987'
    }]); // poderia cadastrar endereço do cliente aqui
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes');
  }
};
