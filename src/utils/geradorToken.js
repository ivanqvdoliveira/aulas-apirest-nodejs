const md5 = require('md5')
const SECRET = 'nutella' // Isso é o que o jtw faz, mas aqui fica até mais seguro colocando sua propria chave

function gerarHashDaSenha (senha) {
  return md5(`@${senha}:${SECRET}@`) // a senha será a combinação de @ + senha + : + @ convertido em md5
}

function criarToken (usuario) {
  let emailBase64 = Buffer.from(usuario.email).toString('base64') // conversor do node, para varios tipo. string pra bite, ut8 e varios outros
  let secret
  let data = new Date()
  let token = md5(`${emailBase64}.${secret}.${data.getTime()}`)
  return token
}

function gerarDataExpiracao () {
  let data = new Date()
  let duracao = process.env.DURACAO_TOKEN * 60000 // tempo de 15 vezes 60k milisegundos
  let dataExpiracao = new Date(data.getTime() + duracao) // tempo em 15 min no futuro

  return dataExpiracao
}


module.exports = {
  gerarHashDaSenha,
  criarToken,
  gerarDataExpiracao
}
