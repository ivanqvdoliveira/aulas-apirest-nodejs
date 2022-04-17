'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('prestadores', [{
      nome: 'Jaci Oliveira',
      email: 'jaci@gmail.com',
      cpfOuCnpj: '98765432100',
      telefone: '987654123',
      observacao: '20 anos de experiência'
    }, {
      nome: 'Edson Arantes Nacimento',
      email: 'pele@gmail.com',
      cpfOuCnpj: '12398765485',
      telefone: '55228854',
      observacao: 'o rei da pintura'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('prestadores');
  }
};
