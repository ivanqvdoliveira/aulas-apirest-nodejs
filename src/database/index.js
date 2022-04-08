const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const connection = new Sequelize(dbConfig) // vai devolver uma conexão de sequelize com banco de dados

// todo modelo criado precisa ser importado aqui
const Perfil = require('../models/Perfil')
const Usuario = require('../models/Usuario')


Perfil.init(connection) // essa é a conexão que vai direto la pro Perfil criado em models
Usuario.init(connection) 

module.exports = connection