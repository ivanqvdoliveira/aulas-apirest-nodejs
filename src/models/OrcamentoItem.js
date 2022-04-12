const { Model, DataTypes} = require('sequelize')

class OrcamentoItem extends Model {
  static init(connection) {
    super.init({ // aqui ele vai mapear tudo o que o sequelize já NÂO MAPEIE, no caso, já mapeia id, e datas.
      idOrcamento: DataTypes.BIGINT,
      idServico: DataTypes.BIGINT,
      idPrestador: DataTypes.BIGINT,
      desconto: DataTypes.DOUBLE,
      acrescimo: DataTypes.DOUBLE,
      valor: DataTypes.DOUBLE,
      valorTotal: DataTypes.DOUBLE,
      observacao: DataTypes.TEXT
    }, {
      sequelize: connection, // pode ter modelos conectando em bancos diferentes
      schema: 'public',
      tableName: 'orcamento-item',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true,
      underscored: false
    })
  }
}

module.exports = OrcamentoItem;
