const { Model, DataTypes} = require('sequelize')

class Orcamento extends Model {
  static init(connection) {
    super.init({ // aqui ele vai mapear tudo o que o sequelize já NÂO MAPEIE, no caso, já mapeia id, e datas.
      descricao: DataTypes.STRING,
      idCliente: DataTypes.BIGINT,
      desconto: DataTypes.DOUBLE,
      acrescimo: DataTypes.DOUBLE,
      valorTotal: DataTypes.DOUBLE,
      observacao: DataTypes.TEXT
    }, {
      sequelize: connection, // pode ter modelos conectando em bancos diferentes
      schema: 'public',
      tableName: 'orcamentos',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true,
      underscored: false
    })
  }
}

module.exports = Orcamento;
