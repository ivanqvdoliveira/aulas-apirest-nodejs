const usuarioService = require('../services/usuarioService')
const { NaoAutorizadoErro, ModeloInvalidoErro } = require('../erros/typeErros')

class UsuarioController {
  async login (req, res) {
    const { email, senha } = req.body
    try {
      if (!email || !senha) {
        throw new NaoAutorizadoErro(401, 'Usuário ou senha inválidos')
      }

      let credencial = await usuarioService.validarUsuario(email, senha);
      return res.json(credencial)

    } catch (error) {
      console.log(error)
    }
  }

  async logout (req, res) {
    try {
      await usuarioService.logout(req.headers.authorization)
    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }

  async obterPorId (req, res) {
    const { id } = req.params
    try {
      if (!id) {
        throw new ModeloInvalidoErro(400, 'O ID é obrigatório para obter o usuário')
      }

      let usuario = await usuarioService.obterPorId(id)
      return res.json(usuario)
    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }

  adicionar (req, res) {
    return res.json({id: 1, nome: 'fulano'})
  }

  atualizar (req, res) {
    return res.json({id: 1, nome: 'fulano'})
  }

  inativar (req, res) {
    return res.json({id: 1, nome: 'fulano'})
  }
}

module.exports = UsuarioController
