const usuarioService = require('../services/usuarioService')
const { NaoAutorizadoErro } = require('../erros/typeErros')

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

  obter (req, res) {
    return res.json({id: 1, nome: 'fulano'})
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
