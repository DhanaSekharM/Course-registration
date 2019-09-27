'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('./database')

const port = 3000;

app.listen(port)

console.log('API running on port: ' + port)
