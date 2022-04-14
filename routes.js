const express = require('express')
const routes = express.Router()
const usuarioService = require('./src/services/usuarioService')

const UsuarioController = require('./src/controllers/UsuarioController')
const ClienteController = require('./src/controllers/ClienteController')
const ServicoController = require('./src/controllers/ServicoController')
const PrestadorController = require('./src/controllers/PrestadorController')
const OrcamentoController = require('./src/controllers/OrcamentoController')

const usuarioController = new UsuarioController()
const clienteController = new ClienteController()
const servicoController = new ServicoController()
const prestadorController = new PrestadorController()
const orcamentoController = new OrcamentoController()


// routes.use vai interceptar todas as rotas que forem chamadas
routes.use(async (req, res, next) => {
  // const { authorization } = req.headers
  // let autenticado = await usuarioService.validarAutenticacao(authorization)
  // if (!autenticado && req.originalUrl !== '/login') { // originalLogin pega exatamente a rota que está registrada no routes
  //   return res.status(401).json({
  //     status: 401,
  //     message: 'Usuário não autenticado',
  //     name: 'NaoAutorizado'
  //   })
  // }

  next() // quando chama esta função está pedindo para prosseguir.
})

// rotas do usuário
routes.post("/login", usuarioController.login)
routes.delete('/logout', usuarioController.logout)
routes.get('/usuarios/:id', usuarioController.obterPorId)
routes.post('/usuarios', usuarioController.cadastrar)
routes.put('/usuarios/:id', usuarioController.atualizar)

// rotas de clientes
routes.get('/clientes', clienteController.obterTodos)
routes.get('/cliente/:id', clienteController.obterPorId)
routes.post('/clientes', clienteController.cadastrar)
routes.put('/cliente/:id', clienteController.atualizar)

// rotas de servicos
routes.get('/servicos', servicoController.obterTodos)
routes.get('/servico/:id', servicoController.obterPorId)
routes.post('/servicos', servicoController.cadastrar)
routes.put('/servico/:id',servicoController.atualizar)

// rotas de prestadores
routes.get('/prestadores', prestadorController.obterTodos)
routes.get('/prestador/:id', prestadorController.obterPorId)
routes.post('/prestadores', prestadorController.cadastrar)
routes.put('/prestador/:id',prestadorController.atualizar)

// rotas de orcamentos
routes.post('/orcamentos', orcamentoController.cadastrar)
routes.get('/orcamentos', orcamentoController.obterTodos)
routes.get('/orcamento/:id', orcamentoController.obterPorId)

module.exports = routes
