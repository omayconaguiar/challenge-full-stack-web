'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('academic_id', 30).notNullable().unique()
      table.string('name', 40).notNullable()
      table.string('email', 30).notNullable().unique()
      table.string('cpf', 30).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
