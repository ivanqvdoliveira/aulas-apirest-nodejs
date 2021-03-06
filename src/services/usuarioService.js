const Usuario = require('../models/Usuario')
const Perfil = require('../models/Perfil')
const { NaoAutorizadoErro, NaoEncontradoErro, AplicacaoErro } = require('../erros/typeErros')
const geradorToken = require('../utils/geradorToken')
const usuarioCache = require('../cache/usuarioCache')
const UsuarioDTO = require('../dtos/UsuarioDTO')
const PerfilDTO = require('../dtos/PerfilDTO')

async function validarUsuario(email, senha){
  // primeiro precisa saber se existe no banco de dados
  // se ja existe, precisa saber se a senha que passou é a correta

  email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({ where: { email }});
  // Gerar hash da senha
  senha = geradorToken.gerarHashDaSenha(senha)

  if(!usuario || (usuario.senha !== senha)){
    throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
  }
    // vai lançar um erro e n retorna nada além, até ser tratado

  let credencial = _criarCredencial(usuario)

  return credencial
}

async function logout (token) {
  usuarioCache.removerNoCache(token)
}

async function obterPorId (id) {
  let usuario = await Usuario.findByPk(id) // obter dados por chave primaria - vem do sequelize pk = primary key
  // Usuario é um modelo do bando de dados

  if(!usuario) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar o usuário pelo ID ${id}`)
  }

  usuario.senha = undefined
  let usuarioDTO = new UsuarioDTO(usuario)
  let perfil = await Perfil.findByPk(usuario.idPerfil)
  usuarioDTO.perfil = new PerfilDTO(perfil)

  return usuarioDTO
}

async function validarAutenticacao (token) {
  let credencial = usuarioCache.obterCredencialPorToken(token)
  if (!credencial || credencial.dataExpiracao < new Date()) {
    if (credencial) {
      usuarioCache.removerNoCache(credencial.token)
    }
    return false
  }

  return true
}

async function cadastrar (usuarioDTO) {
  usuarioDTO.senha = geradorToken.gerarHashDaSenha(usuarioDTO.senha) // transforma a senha num hash

  let usuario = await Usuario.create(usuarioDTO) // cria uma instancia de usuario

  if (!usuario) { // se n tiver usuario manda retorno
    throw new AplicacaoErro(500, 'Falha ao cadastrar o usuario')
  }

  let dto = new UsuarioDTO(usuario) // cria uma const de usuario 
  dto.senha = undefined // remover a senha para n ficar publica
  dto.perfil = new PerfilDTO(await Perfil.findByPk(dto.idPerfil)) // aqui ele adiciona o perfil ao cadastro porque quando vem do banco, n tem perfil. precisa então chamar o perfil de acordo com o id perfil o new cria, a partir do momento que ele busca no findByPk
  return dto
}

async function atualizar (usuarioDTO) { // no estilo PUT atualizando o cadastro por inteiro, mesmo tentom udado uma parte apenas
  let usuario = await Usuario.findByPk(usuarioDTO.id)

  if(!usuario) {
    throw new NaoEncontradoErro(404, `Não foi possível encontrar o usuário pelo ID ${id}`)
  }
  usuarioDTO.senha = usuario.senha // para garantir que a senha n se perca no processo, ela é adicionada aqui antes do update

  usuario = await Usuario.update(usuarioDTO, {where: { id: usuarioDTO.id}}) //update leva dois parametros, o primeiro ele vai ver o que ele vai alterar o segundo ele passa um where pra identificar na lista qual será o usuario a ser alterado

  if (!usuario || !usuario[0]) { // ao atualizar, ele vai devolver um array com duas posicoes, a 0 é o bojeto q atualizou e a 1 o comando q ele usou pra atualizar
    throw new AplicacaoErro(500, `Falha ao atualizar o usuario com id ${usuarioDTO.id}`)
  }

  usuarioDTO.senha = undefined // após o sucesso no update, a senha é removida para que ela não fique publica no retorno
  return new UsuarioDTO(usuarioDTO)
}

//quando tem undeline na frente da sunfção á para que ela n seja exportada, isso não impede que seja exportada, mas se acontecer foge do padrão e ta errado
function _criarCredencial (usuario) { 

  let dataExpiracao = geradorToken.gerarDataExpiracao()
  let credencial = usuarioCache.obterCredencial(usuario)

  if(credencial) {
    if(credencial.dataExpiracao < new Date()) {
      usuarioCache.removerNoCache(credencial.token)
    } else {
      usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao)
      return credencial
    }
  }

  let token = geradorToken.criarToken(usuario)
  usuario.senha = undefined // zera a senha pra que ela n fique trafegando
  credencial = {token, usuario, dataExpiracao}
  usuarioCache.adicionarNoCache(credencial)

  return credencial
}

module.exports = {
  validarUsuario,
  logout,
  obterPorId,
  validarAutenticacao,
  cadastrar,
  atualizar
}
