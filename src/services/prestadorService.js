const Prestador = require('../models/Prestador')
const PrestadorDTO = require('../dtos/PrestadorDTO')
const {
  NaoEncontradoErro,
  AplicacaoErro
} = require('../erros/typeErros')


async function obterPorId (id) {
  let prestador = await Prestador.findByPk(id)

  if (!prestador) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar orestador com id ${id}`)
  }

  return new PrestadorDTO(prestador)
}

async function obterTodos () {
  let prestadores = await Prestador.findAll()

  return prestadores && prestadores.map(item => new PrestadorDTO(item)) || []
}

async function cadastrar (prestadorDTO) {
  let prestador = await Prestador.create(prestadorDTO)

  if (!prestador) {
    throw new AplicacaoErro(500, 'Não foi possível cadastrar o orestador.')
  }

  return new PrestadorDTO(prestador)
}

async function atualizar (prestadorDTO) {
  let prestador  = await Prestador.findByPk(prestadorDTO.id)

  if (!prestador) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar um prestador com o id ${prestadorDTO.id}`)
  }
  
  let atualiado = await Prestador.update(prestadorDTO, { where: { id: prestadorDTO.id }})

  if (!atualiado) {
    throw new AplicacaoErro(500, 'Não foi possível atualizar o prestador')
  }

  return prestadorDTO
}

module.exports = {
  cadastrar,
  atualizar,
  obterPorId,
  obterTodos
}
