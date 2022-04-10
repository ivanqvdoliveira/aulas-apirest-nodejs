'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('orcamentos', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idCliente: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      desconto: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      acrescimo: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      valorTotal: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      criadoEm: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      atualizadoEm: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orcamentos')
  }
};
