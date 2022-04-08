const express = require('express')
const routes = express.Router()
const usuarioService = require('./src/services/usuarioService')
const UsuarioController = require('./src/controllers/UsuarioController')
const usuarioController = new UsuarioController()


// routes.use vai interceptar todas as rotas que forem chamadas
routes.use(async (req, res, next) => {
  const { authorization } = req.headers
  let autenticado = await usuarioService.validarAutenticacao(authorization)
  if (!autenticado && req.originalUrl !== '/login') { // originalLogin pega exatamente a rota que está registrada no routes
    return res.status(401).json({
      status: 401,
      message: 'Usuário não autenticado',
      name: 'NaoAutorizado'
    })
  }

  next() // quando chama esta função está pedindo para prosseguir.
})

// rotas do usuário
routes.post("/login", usuarioController.login)
routes.delete('/logout', usuarioController.logout)
routes.get('/usuarios/:id', usuarioController.obterPorId)
routes.post('/usuarios', usuarioController.cadastrar)

module.exports = routes
