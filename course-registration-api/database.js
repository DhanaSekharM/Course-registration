'use strict'
const mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: '123456',
})

connection.connect((err) => {
    if(err) throw err

    console.log('Connected to db')
})

module.exports = connection;