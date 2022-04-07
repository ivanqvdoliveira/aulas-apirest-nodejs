'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.BIGINT, // bigint numero muito grande, pra poder caber mta coisa.
        primaryKey: true, // vai ser chave primaria da tabela
        autoIncrement: true, // vai incrementando de 1 em um.
      },
      nome: {
        type: Sequelize.STRING, // var de 255 char
        allowNull: false, // Não permite valor nulo pro campor de descrição
      },
      email: {
        type: Sequelize.STRING, // var de 255 char
        allowNull: false, // Não permite valor nulo pro campor de descrição
        unique: true, // não permite cadastrar mais de um igual a este
      },
      senha: {
        type: Sequelize.TEXT, // pode usar STRING ou TEXT o text permite mair abrangencia de texto
        allowNull: false, // Não permite valor nulo pro campor de descrição
      },
      idPerfil: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      dataInativacao: {
        type: Sequelize.DATE,
        defaultValue: null,
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
    return queryInterface.dropTable('usuarios')
  }
};
