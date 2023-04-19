const express = require('express')
const cors = require('cors')
require('dotenv').config()

const dbRouter = require('./controllers/db')
const gestionRouter = require('./controllers/gestion')
const usersRouter = require('./controllers/users')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static('build'))

app.use('/api/clients', dbRouter)
app.use('/api/selected', gestionRouter)
app.use('/api/login', usersRouter)

module.exports = app
