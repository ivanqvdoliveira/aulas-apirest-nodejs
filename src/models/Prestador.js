const { Model, DataTypes} = require('sequelize')

class Prestador extends Model {
  static init(connection) {
    super.init({ // aqui ele vai mapear tudo o que o sequelize já NÂO MAPEIE, no caso, já mapeia id, e datas.
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.STRING,
      cpfOuCnpj: DataTypes.STRING,
      observacao: DataTypes.TEXT
    }, {
      sequelize: connection, // pode ter modelos conectando em bancos diferentes
      schema: 'public',
      tableName: 'prestadores',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true,
      underscored: false
    })
  }
}

module.exports = Prestador;
