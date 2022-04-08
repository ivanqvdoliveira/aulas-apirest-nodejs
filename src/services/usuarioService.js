const Usuario = require('../models/Usuario')
const { NaoAutorizadoErro } = require('../erros/typeErros')
const geradorToken = require('../utils/geradorToken')
const usuarioCache = require('../cache/usuarioCache')

async function validarUsuario(email, senha){
  // primeiro precisa saber se existe no banco de dados
  // se ja existe, precisa saber se a senha que passou é a correta

  email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({ where: { email }});
  // Gerar hash da senha
  senha = geradorToken.gerarHashDaSenha(senha);

  if(!usuario || (usuario.senha !== senha)){
    throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
  }
    // vai lançar um erro e n retorna nada além, até ser tratado

  let credencial = _criarCredencial(usuario)

  return credencial
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
  validarUsuario
}
