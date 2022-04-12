const sequelize = require('../database/index')

const OrcamentoDTO = require('../dtos/OrcamentoDTO')
const ClienteDTO = require('../dtos/ClienteDTO')
const OrcamentoItemDTO = require('../dtos/OrcamentoItemDTO')
const PrestadorDTO = require('../dtos/PrestadorDTO')
const ServicoDTO = require('../dtos/ServicoDTO')
const Status = require('../dtos/Status')
const UsuarioDTO = require('../dtos/UsuarioDTO')

const sql = `
SELECT
	O.id,
	O."descricao",
	Cl.id as "idCliente",
	Cl."nome" as "nomeCliente",
	Cl."telefone" as "telefoneCliente",
	Cl."cpfOuCnpj" as "cpfOuCnpjCliente"
	FROM public.orcamentos O
	LEFT JOIN public."orcamento-item" OI ON (O.id = OI."idOrcamento")
	LEFT JOIN public.clientes CL ON (O."idCliente" = CL."id")
	LEFT JOIN public.servicos S ON (OI."idServico" = S.id)
`

async function obterOrcamentos () {
  let [ orcamentos ] = await sequelize.query(sql)
  
}

async function obterOrcamento (idOrcamento) {
  let where = `where O.id = ${idOrcamento}`
  let orcamentos = await sequelize.query(`${sql} ${where}`)
}

module.exports = {
  obterOrcamentos,
  obterOrcamento
}
