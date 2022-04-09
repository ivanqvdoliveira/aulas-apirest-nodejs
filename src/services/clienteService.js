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
  clienteDTO.id = parseInt(clienteDTO.id)
  let cliente  = await Cliente.findByPk(clienteDTO.id)

  if (!cliente) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar um cliente com o id ${clienteDTO.id}`)
  }
  
  let atualiado = await Cliente.update(clienteDTO, { qhere: { id: clienteDTO.id }})

  if (!atualiado) {
    throw new AplicacaoErro(500, 'Não foi possível atualizar o cliente')
  }

  for (let endereco in clienteDTO.enderecos) {
    await Endereco.update(endereco, { where: { id: endereco.id }})
  } // vai pegar a lista de endereços e pra cada um deles vai atualizar no banco, pois não precisa inserir novmamente no DTo pois já está lá e está configurado, ainda não está tratando se por algum motivo o endereço estiver fora dos padrões

  return clienteDTO


}

modules.exports = {
  cadastrar,
  atualizar
}
