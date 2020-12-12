'use strict'

const User = use('App/Models/User')

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

  async store ({ request }) {
    const data = request.only(['academic_id', 'name', 'cpf', 'email'])

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
