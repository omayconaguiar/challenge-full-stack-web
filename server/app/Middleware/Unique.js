'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const {cpf} = require('cpf-cnpj-validator')
const validator = require('email-validator')

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, request }, next) {
      const data = request.only(['academic_id', 'name', 'cpf', 'email'])

      if(data.academic_id.length != 6) {
        return response.status(409).send("Registro acadêmico deve ter 6 caracteres")
      }
      if(!validator.validate(data.email)) {
        return response.status(409).send("Email inválido")
      }
      if(!cpf.isValid(data.cpf)){
        return response.status(409).send("Cpf inválido")
      }

      var uniqueEmail = await User
        .query()
        .where('email', '=', data.email)
        .fetch()

      var uniqueAcademic = await User
        .query()
        .where('academic_id', '=', data.academic_id)
        .fetch()

      var uniqueCpf = await User
        .query()
        .where('cpf', '=',  data.cpf)
        .fetch()

      if(uniqueEmail.rows.length){
        return response.status(409).send("Email já existente, tente o cadastro com um novo email.")
      }
      if(uniqueAcademic.rows.length){
        return response.status(409).send("Registro acadêmico já existente, tente o cadastro com um novo registro.")
      }
      if(uniqueCpf.rows.length){
        return response.status(409).send("Cpf já existente, tente o cadastro com um novo cpf.")
      }

    await next()
  }
}

module.exports = IsAdmin
