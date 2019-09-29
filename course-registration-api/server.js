'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('./routes/database')
const routes = require('./routes/apiRoutes')

const port = 3000;

app.listen(port)

console.log('API running on port: ' + port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
routes(app)
