const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')
const ClienteDTO = require('../dtos/ClienteDTO')
const EnderecoDTO = require('../dtos/EnderecoDTO')
const {
  NaoEncontradoErro,
  AplicacaoErro
} = require('../erros/typeErros')

async function obterTodos () {
  let clientes = await Cliente.findAll()

  return clientes && clientes.map(c => new ClienteDTO(c)) || []
}

async function obterPorId (id) {
  let cliente = await Cliente.findByPk(id)

  if (!cliente) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar cliente com id ${id}`)
  }

  cliente = new ClienteDTO(cliente)

  let endereco = await Endereco.findAll({ where: { idCliente: id }})
  cliente.enderecos = endereco.map(e => new EnderecoDTO(e))
  return cliente
}

async function cadastrar (clienteDTO) {
  let cliente = await Cliente.create(clienteDTO) // o create é do sequelize, ele sabe cadastrar fazer update etc.
  if (!cliente) {
    throw new AplicacaoErro(500, 'Não foi possível cadastrar o cliente.')
  }

  let enderecos = []
  for (let endereco of clienteDTO.enderecos) { // quando for 'for ... in' ele busca o indice (trás  o index) para trazer o valor precisa usar 'for...of'
    endereco.idCliente = parseInt(cliente.id) // é preciso passar o id do cliente ao fazer o cadastro do endereço
    let novoEndereco = await Endereco.create(endereco)

    enderecos.push(new EnderecoDTO(novoEndereco))
  }

  cliente = new ClienteDTO(cliente)
  cliente.enderecos = enderecos

  return cliente
}

async function atualizar (clienteDTO) {
  let cliente  = await Cliente.findByPk(clienteDTO.id)

  if (!cliente) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar um cliente com o id ${clienteDTO.id}`)
  }
  
  let atualiado = await Cliente.update(clienteDTO, { where: { id: clienteDTO.id }})

  if (!atualiado) {
    throw new AplicacaoErro(500, 'Não foi possível atualizar o cliente')
  }

  for (let endereco of clienteDTO.enderecos) {
    await Endereco.update(endereco, { where: { id: endereco.id }})
  } // vai pegar a lista de endereços e pra cada um deles vai atualizar no banco, pois não precisa inserir novmamente no DTo pois já está lá e está configurado, ainda não está tratando se por algum motivo o endereço estiver fora dos padrões

  return clienteDTO
}

module.exports = {
  cadastrar,
  atualizar,
  obterPorId,
  obterTodos
}
