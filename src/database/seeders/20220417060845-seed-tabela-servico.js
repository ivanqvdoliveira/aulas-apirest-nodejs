'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('servicos', [{
      descricao: 'Pintura Interna M2',
      valor: 100,
      observacao: 'Feito com até 3 demão'
    }, {
      descricao: 'Pintura Externa M2',
      valor: 300,
      observacao: 'Feito com até 3 demão'
    }]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('servicos');
  }
};
