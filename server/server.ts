import type { Express } from 'express'
const express = require('express')

const app: Express = express()

const corOptions = {
	credentials: true,
	origin: true,
}

require('dotenv').config() // load envirnmental variables
app.use(require('cors')(corOptions)) // resolve cors
app.use(express.json()) // parse JSON body

app.get('/daijobou', (req, res) => res.json({ message: 'Daijobou Desu' }).end())
require('./api/routes/index.route')(app) // routes

app.listen(process.env.PORT ?? 5000)
