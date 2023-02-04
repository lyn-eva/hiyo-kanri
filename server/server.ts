import express, { type Express } from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { apolloServer } from './graphql/schema'

const app: Express = express()

async function main() {
	require('dotenv').config() // load envirnmental variables
	app.use(require('cors')(corOptions)) // resolve cors
	app.use(express.json()) // parse JSON body
	await apolloServer.start()

	app.use(expressMiddleware(apolloServer))
	app.get('/daijobou', (req, res) => res.json({ message: 'Daijobou Desu' }).end())
	require('./api/routes/index.route')(app) // routes

	app.listen(process.env.PORT ?? 5000)
}

const corOptions = {
	credentials: true,
	origin: true,
}

main()
