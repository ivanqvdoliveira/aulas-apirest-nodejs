'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ernderecos', {
      id: {
        type: Sequelize.BIGINT, // bigint numero muito grande, pra poder caber mta coisa.
        primaryKey: true, // vai ser chave primaria da tabela
        autoIncrement: true // vai incrementando de 1 em um.
      },
      idCliente: {
        type: Sequelize.BIGINT,
        allowNull: false, // Não permite valor nulo pro campor de descrição
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('ernderecos')
  }
};
