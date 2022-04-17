const Orcamento = require('../models/Orcamento')
const OrcamentoItem = require('../models/OrcamentoItem')
const OrcamentoDTO = require('../dtos/OrcamentoDTO')
const OrcamentoItemDTO = require('../dtos/OrcamentoItemDTO')
const orcamentoCQRS = require('../cqrs/orcamentoCQRS')
const connection = require('../database/index')

const { NaoEncontradoErro, AplicacaoErro } = require('../erros/typeErros')
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
    throw new NaoEncontradoErro(404, `Não foi possível encontrar orçamento com id ${id}`)
  }

  return await orcamentoCQRS.obterOrcamento(id)
}

async function obterTodos () {
  return await orcamentoCQRS.obterOrcamentos()
}

async function cadastrar (orcamentoDTO) {
  let transaction = await connection.transaction() // um transaction faz com que vc guarde as informações na memoria, sem salvar no disco (bd). com isso, caso tenha feito algo errado é possível dar um rollback, se não, pode constinuar com um commit

  try {

    orcamentoDTO.idCliente = orcamentoDTO.cliente.id
    orcamentoDTO.id = undefined // aqui garante que usuario n tem ID
    // orcamentoDTO.idStatus = orcamentoDTO.status.id

    let orcamento = await Orcamento.create(orcamentoDTO, { transaction }) // passando aqui o transaction, ele vai saber lá no final fazer o rollback caso seja necessario, sem isso ele n saberá, e não será feito

    orcamento = new OrcamentoDTO(orcamento)

    orcamento.itens = orcamentoDTO.itens.map(item => {
      item.id = undefined
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
    if(!itens){
      throw new AplicacaoErro(500,'Não foi possível cadastrar os itens.');
    }

    await transaction.commit()

    return orcamentoCQRS.obterOrcamento(orcamento.id)
  } catch (error) {
    await transaction.rollback()
  }

  return {}
}

async function atualizar (orcamentoDTO) {
  let transaction = await connection.transaction()

  try {

    let orcamentoBD = await orcamentoCQRS.obterOrcamento(orcamentoDTO.id)

    if (!orcamentoBD) {
      throw new NaoEncontradoErro(404, `Não é possível atualizar o orçamento pelo id ${orcamentoDTO.id}`)
    }

    await _adicionarItens(orcamentoDTO, orcamentoBD, transaction)
    await _atualizarItens(orcamentoDTO, orcamentoBD, transaction)
    await _deletarItens(orcamentoDTO, orcamentoBD, transaction)

    await transaction.commit()

    return await orcamentoCQRS.obterOrcamento(orcamentoDTO.id)

  } catch (error) {

    await transaction.rollback()
    throw new AplicacaoErro(500, `Não foi possível atualizar o orcamento, motivo: ${error.message}`)
  }

  return {}
}

async function _adicionarItens(orcamentoDTO, orcamentoBD, transaction){
  let itensAdicionados = []

  orcamentoDTO.itens.map(item => {
    if (!orcamentoBD.itens.some(i => i.id == item.id)) {
        item.idOrcamento = orcamentoDTO.id
        item.idServico = item.servico.id
        item.idPrestador = item.prestador.id
        item.calcularValorTotal()
        
        itensAdicionados.push(item)
    }
  })

  if(itensAdicionados.length){
    itensAdicionados =  await OrcamentoItem.bulkCreate(itensAdicionados, {
      transaction,
      returning:true,
      validate: true
    })
  }
}

async function _atualizarItens(orcamentoDTO, orcamentoBD, transaction){
  let itensParaAtualizar = []
  orcamentoDTO.itens.map(item => {
    if (orcamentoBD.itens.some(i => i.id == item.id)) {
      item.calcularValorTotal()
      itensParaAtualizar.push(item)
    }
  })

  if (itensParaAtualizar.length) {
    for (let item of itensParaAtualizar) {
      await OrcamentoItem.update(item, { where : { id: item.id }})
    }
  }
}

async function _deletarItens(orcamentoDTO, orcamentoBD, transaction){
  let itensParaRemover = []
  orcamentoBD.itens.map(item => {
    if (!orcamentoDTO.itens.some(i => i.id == item.id)) {
      itensParaRemover.push(item)
    }
  })

  if (itensParaRemover.length) {
    await OrcamentoItem.destroy({ where:
      { id: itensParaRemover.map(i => i.id) }, transaction
    })
  }
}

module.exports = {
  cadastrar,
  atualizar,
  obterPorId,
  obterTodos
}
