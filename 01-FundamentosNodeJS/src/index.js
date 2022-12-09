const { json } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

/**
 * cpf- string
 * name- string
 * id- uuid
 * statement []
 */

const app = express()

app.use(express.json())

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers
  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found!' })
  }
  return next()
}

const customers = []

app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf,
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' })
  }

  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: [],
  })
  return response.status(201).send()
})

// app.use(verifyIfExistsAccountCPF)
// Todas requisições abaixo desse middleware terão que passar por estas verificações

app.get('/statement/', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request
  return response.status(200).json(customer.statement)
})
app.listen(3333)
