const express = require('express')
const routes = express.Router()

const UsuarioController = require('./src/controllers/UsuarioController')
const usuarioController = new UsuarioController()

// rotas do usuário
routes.post("/usuarios", usuarioController.login)
routes.get('/usuarios/:id', usuarioController.obter)

module.exports = routes
