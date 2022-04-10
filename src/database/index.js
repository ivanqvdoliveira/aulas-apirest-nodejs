const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const connection = new Sequelize(dbConfig) // vai devolver uma conexão de sequelize com banco de dados

// todo modelo criado precisa ser importado aqui
const Perfil = require('../models/Perfil')
const Usuario = require('../models/Usuario')
const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')
const Status = require('../models/Status')
const Prestador = require('../models/Prestador')
const Servico = require('../models/Servico')

Perfil.init(connection) // essa é a conexão que vai direto la pro Perfil criado em models
Usuario.init(connection)
Cliente.init(connection)
Endereco.init(connection)
Status.init(connection)
Prestador.init(connection)
Servico.init(connection)

module.exports = connection
