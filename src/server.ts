import fastify from 'fastify'
import { config, knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request, reply) => {
  console.log(`${request.method}] ${request.url}`)
})

app.register(transactionRoutes, {
  prefix: 'transactions',
})
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running! ${env.PORT}`)
  })
