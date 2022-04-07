'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('perfis', {
      id: {
        type: Sequelize.BIGINT, // bigint numero muito grande, pra poder caber mta coisa.
        primaryKey: true, // vai ser chave primaria da tabela
        autoIncrement: true // vai incrementando de 1 em um.
      },
      descricao: {
        type: Sequelize.STRING, // var de 255 char
        allowNull: false, // Não permite valor nulo pro campor de descrição
      },
      criadoEm: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // vai pegar a data e hora do momento da criação
      },
      atualizadoEm: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('perfis')
  }
};
