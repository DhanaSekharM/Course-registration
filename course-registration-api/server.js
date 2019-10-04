'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('./routes/database')
const routes = require('./routes/apiRoutes')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const port = 3000;
const session = require('express-session')

app.listen(port)

console.log('API running on port: ' + port)

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(session({ secret: "cats" }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
    (username, password, done) => {
        var user = {
            username: 'admin',
            password: '12345678'
        }
        return done(null, user)
    }
))

passport.serializeUser((user, done) => {
    // console.log(user.username)
    done(null, user.username)
})

passport.deserializeUser(function(username, done) {
    console.log(username+'d')
    var user = {
        username: username
    }
    done(null, user)
    // next()
  });

routes(app)


