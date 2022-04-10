const Servico = require('../models/Servico')
const ServicoDTO = require('../dtos/ServicoDTO')
const {
  NaoEncontradoErro,
  AplicacaoErro
} = require('../erros/typeErros')


async function obterPorId (id) {
  let servico = await Servico.findByPk(id)

  if (!servico) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar serviço com id ${id}`)
  }

  return new ServicoDTO(servico)
}

async function obterTodos () {
  let servicos = await Servico.findAll()

  return servicos && servicos.map(c => new ServicoDTO(c)) || []
}

async function cadastrar (servicoDTO) {
  let servico = await Servico.create(servicoDTO)

  if (!servico) {
    throw new AplicacaoErro(500, 'Não foi possível cadastrar o serviço.')
  }

  return new ServicoDTO(servico)
}

async function atualizar (servicoDTO) {
  let servico  = await Servico.findByPk(servicoDTO.id)

  if (!servico) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar um serviço com o id ${servicoDTO.id}`)
  }
  
  let atualiado = await Servico.update(servicoDTO, { where: { id: servicoDTO.id }})

  if (!atualiado) {
    throw new AplicacaoErro(500, 'Não foi possível atualizar o serviço')
  }

  return servicoDTO
}

module.exports = {
  cadastrar,
  atualizar,
  obterPorId,
  obterTodos
}
