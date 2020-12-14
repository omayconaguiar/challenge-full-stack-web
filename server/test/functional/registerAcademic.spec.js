const { test, trait } = use('Test/Suite')('01-Academic-Api')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Database = use('Database')

trait('Test/ApiClient')

test('it should create registers with success', async ({ assert, client }) => {
  const sessionPayload = {
    academic_id: '111111',
    name: 'Maycon',
    cpf: '83916513044',
    email: 'mail@example.com'
  }

  const response = await client
    .post('/api/users')
    .send(sessionPayload)
    .end()

  response.assertStatus(200)

  assert.exists(response.body)
})

test('it should get user with success', async ({ assert, client }) => {
  const response = await client
    .get('/api/users')
    .end()

  response.assertStatus(200)

  assert.exists(response.body)
})

test('it should get register search by name with success', async ({ assert, client }) => {
  const response = await client
    .get('/api/users?name="Maycon"')
    .end()

  response.assertStatus(200)

  assert.exists(response.body)
})

test('it should update register with success', async ({ assert, client }) => {
  const sessionPayload = {
    academic_id: '101236',
    name: 'Joao',
    cpf: '74121774000',
    email: 'mail2@example.com'
  }

  await client
    .post('/api/users')
    .send(sessionPayload)
    .end()

  const payload = {
    academic_id: '111236',
    name: 'Juca',
    cpf: '76776232040',
    email: 'mail3@example.com'
  }

  const id = await Database
    .select('id')
    .from('users')

  const response = await client
    .put('/api/users/'+ id[0].id)
    .send(payload)
    .end()


  response.assertStatus(200)

  assert.exists(response.body)
})

test('it should delete register by id with success', async ({ assert, client }) => {
  const sessionPayload = {
    academic_id: '121235',
    name: 'Mario',
    cpf: '99084552067',
    email: 'mail4@example.com'
  }

  await client
    .post('/api/users')
    .send(sessionPayload)
    .end()

  const id = await Database
    .select('id')
    .from('users')

  const response = await client
    .delete('/api/users/'+ id[0].id)
    .end()

  response.assertStatus(200)

  assert.exists(response.body)
})



