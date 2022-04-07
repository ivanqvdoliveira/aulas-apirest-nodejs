const md5 = require('md5')
const SECRET = 'nutella' // Isso é o que o jtw faz, mas aqui fica até mais seguro colocando sua propria chave

function gerarHashDaSenha(senha) {
  return md5(`@${senha}:${SECRET}@`) // a senha será a combinação de @ + senha + : + @ convertido em md5
}

module.exports = { gerarHashDaSenha }
