const { Model, DataTypes} = require('sequelize')

class Status extends Model {
  static init(connection) {
    super.init({ // aqui ele vai mapear tudo o que o sequelize já NÂO MAPEIE, no caso, já mapeia id, e datas.
      descricao: DataTypes.STRING
    }, {
      sequelize: connection, // pode ter modelos conectando em bancos diferentes
      schema: 'public',
      tableName: 'status',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true,
      underscored: false
    })
  }
}

module.exports = Status;
