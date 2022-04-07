const ModeloInvalidoErro = class ModeloInvalidoErro {
  // JavaDoc é usado para colocar informação no método, quando passar o mouse em cima,
  // ele mostra a documentação par ainformar para que serve aquele método usando apenas /** e danto enter

  /**
   * Classe utilizada para exceções de modelos e dtos
   * @param {Number} status 
   * @param {String} mensagem 
   */

  constructor(status, mensagem) {
    this.status = status || 400 // bad request por parte do cliente
    this.message = mensagem || 'O Modelo informado é inválido'
    this.name = 'ModeloInvalido'
    this.stack = (new Error()).stack
  }
}

const NaoAutorizadoErro = class NaoAutorizadoErro {
  /**
   * Classe utilizada para exceções de acessos ou recursos não aautorizados
   * @param {Number} status 
   * @param {String} mensagem 
   */

  constructor(status, mensagem) {
    this.status = status || 403 // forbiden 
    this.message = mensagem || 'Recurso não autorizado'
    this.name = 'NaoAutorizado'
    this.stack = (new Error()).stack
  }
}

const NaoEncontradoErro = class NaoEncontradoErro {
  /**
   * Classe utilizada para exceções de objetos ou recusos nao encontrados
   * @param {Number} status 
   * @param {String} mensagem 
   */

  constructor(status, mensagem) {
    this.status = status || 404 // Not Found
    this.message = mensagem || 'Não Encontrado'
    this.name = 'NaoEncontrado'
    this.stack = (new Error()).stack
  }
}

const AplicacaoErro = class AplicacaoErro {
  /**
   * Classe utilizada para exceções de modelos e dtos
   * @param {Number} status 
   * @param {String} mensagem 
   */

  constructor(status, mensagem) {
    this.status = status || 500 // Internal Error
    this.message = `Erro interno na aplicação ${ mensagem && '- ' + mensagem }`
    this.name = 'Aplicacao'
    this.stack = (new Error()).stack
  }
}

module.exports = {
  ModeloInvalidoErro,
  NaoAutorizadoErro,
  NaoEncontradoErro,
  AplicacaoErro
}
