const { Model, DataTypes} = require('sequelize')

class Usuario extends Model {
  static init(connection) {
    super.init({ // aqui ele vai mapear tudo o que o sequelize já NÂO MAPEI, no caso, já mapeia id, e datas.
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.TEXT,
      idPerfil: DataTypes.BIGINT,
      dataInativacao: DataTypes.DATE
    }, {
      sequelize: connection, // pode ter modelos conectando em bancos diferentes
      schema: 'public',
      tableName: 'usuarios',
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
      timestamps: true,
      underscored: false
    })
  }
}

module.exports = Usuario;
