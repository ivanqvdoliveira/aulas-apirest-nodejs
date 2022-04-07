const Usuario = require('../models/Usuario')
const { NaoAutorizadoErro } = require('../erros/typeErros')
const geradorToken = require('../utils/geradorToken')

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

  console.log()
}

module.exports = {
  validarUsuario
}
