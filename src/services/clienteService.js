const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')
const ClienteDTO = require('../dtos/ClienteDTO')
const EnderecoDTO = require('../dtos/EnderecoDTO')
const {
  NaoAutorizadoErro,
  NaoEncontradoErro,
  AplicacaoErro
} = require('../erros/typeErros')

async function cadastrar (clienteDTO) {
  let cliente = Cliente.create(clienteDTO(clienteDTO)) // o create é do sequelize, ele sabe cadastrar fazer update etc.
  if (!cliente) {
    throw new AplicacaoErro(500, 'Não foi possível cadastrar o cliente.')
  }

  let enderecos = []
  for (let endereco in clienteDTO.enderecos) {
    let novoEndereco = await Endereco.create(endereco)

    enderecos.push(new EnderecoDTO(novoEndereco))
  }

  cliente = new ClienteDTO(cliente)
  cliente.enderecos = enderecos

  return cliente
}

async function atualizar (clienteDTO) {

}

modules.exports = {
  cadastrar,
  atualizar
}
