const { ModeloInvalidoErro } = require("../erros/typeErros")
const EnderecoDTO = require("./EnderecoDTO")

module.exports = class ClienteDTO {
  constructor(obj) {
    obj = obj || {}
    this.id = obj.id
    this.nome = obj.nome
    this.email = obj.email
    this.cpfOuCnpj = obj.cpfOuCnpj
    this.telefone = obj.telefone
    this.enderecos = obj.enderecos && obj.enderecos.map(e => new EnderecoDTO(e)) || [] // fazendo dessa forma, ele vai trazer uma lista de endereços, e vai tranformar cada endereço em um enderecoDTO, caso n tenha nda, retorna um array vazio
    this.criadoEm = obj.criadoEm
    this.atualizadoEm = obj.atualizadoEm
  }

  modeloValidoCadastro () {
    this._validarModelo
  }

  modeloValidoAtualizacao () {
    this._validarModelo
  }

  _validarModelo () {
    if (!this.nome) {
      throw new ModeloInvalidoErro(400, 'O nome é obrigatório para cadastro')
    }
  }
}
