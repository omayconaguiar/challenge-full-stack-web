'use strict'

const User = use('App/Models/User')
const {cpf} = require('cpf-cnpj-validator')
const validator = require('email-validator')

class UserController {
  async index ({ request }) {

    const term = request.input('name')

    if(!term) {
      var posts = await User.all()
    }else{
      posts = await User
      .query()
      .where('name', '=', term)
      .fetch()
    }

    return posts
  }

  async store ({ request, response }) {
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

    const user = await User.create(data)

    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async update ({ params, request, response }) {
    const data = request.only(['email', 'name'])

    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    const data = await user.delete()

    return data;
  }
}

module.exports = UserController
