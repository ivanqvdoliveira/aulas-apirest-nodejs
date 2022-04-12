const Orcamento = require('../models/Orcamento')
const OrcamentoItem = require('../models/OrcamentoItem')
const OrcamentoDTO = require('../dtos/OrcamentoDTO')
const OrcamentoItemDTO = require('../dtos/OrcamentoItemDTO')

const connection = require('../database/index')

const {
  NaoEncontradoErro,
  AplicacaoErro
} = require('../erros/typeErros')
const { format } = require('express/lib/response')

async function obterPorId (id) {
  let orcamento = await Orcamento.findByPk(id)
  // quando houver consultas complexas, este modelo de consulta ao banco não é indicado. num exmeplo de orcamento com 2 itens, passaraim muitas vezes pelo banco, se tiver mais de 50 itens poderia topar o banco

  /* Objetos simples
    -> persistencia: Sequelize
    -> consulta: Sequelize

    Objeto complexas
    -> persistencia: Sequelize
    -> consulta: CQRS: Consultas diretas ao banco de dados, query

    CQRS: padrão de arquitetura de projetos escalaceis - DDD arquitetura escaláveis
    Command Query Responsability Segregation
   */

  if (!orcamento) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar serviço com id ${id}`)
  }

  return new OrcamentoDTO(orcamento)
}

async function obterTodos () {
  let orcamentos = await Orcamento.findAll()

  return orcamentos && orcamentos.map(c => new OrcamentoDTO(c)) || []
}

async function cadastrar (orcamentoDTO) {
  let transaction = await connection.transaction() // um transaction faz com que vc guarde as informações na memoria, sem salvar no disco (bd). com isso, caso tenha feito algo errado é possível dar um rollback, se não, pode constinuar com um commit

  try {
    orcamentoDTO.idCliente = orcamentoDTO.cliente.id
    // orcamentoDTO.idStatus = orcamentoDTO.status.id

    let orcamento = await Orcamento.create(orcamentoDTO, { transaction }) // passando aqui o transaction, ele vai saber lá no final fazer o rollback caso seja necessario, sem isso ele n saberá, e não será feito

    orcamento = new OrcamentoDTO(orcamento)

    orcamento.itens = orcamentoDTO.itens.map(item => {
      item.idOrcamento = orcamento.id
      item.idServico = item.servico.id
      item.idPrestador = item.prestador.id
      item.calcularValorTotal()

      return item
    })

    let itens = await OrcamentoItem.bulkCreate(orcamento.itens, {
      transaction,
      returning: true, // confirma retorno do dado da transação
      validate: true, // valida os itens
    }) // sabe dar varios inserts de uma vez só, faz esperando uma lista de itens

    orcamento.itens = itens.map(i => new OrcamentoItemDTO(i))
    

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
  }

  // if (!orcamento) {
  //   throw new AplicacaoErro(500, 'Não foi possível cadastrar o serviço.')
  // }

  // return new OrcamentoDTO(orcamento)
}

async function atualizar (orcamentoDTO) {
  let orcamento  = await Orcamento.findByPk(orcamentoDTO.id)

  if (!orcamento) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar um serviço com o id ${orcamentoDTO.id}`)
  }
  
  let atualiado = await Orcamento.update(orcamentoDTO, { where: { id: orcamentoDTO.id }})

  if (!atualiado) {
    throw new AplicacaoErro(500, 'Não foi possível atualizar o serviço')
  }

  return orcamentoDTO
}

module.exports = {
  cadastrar,
  atualizar,
  obterPorId,
  obterTodos
}
