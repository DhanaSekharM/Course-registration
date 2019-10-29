'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./routes/database')
const routes = require('./routes/apiRoutes')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const port = 3001;
const session = require('express-session')
const cors = require('cors')

app.listen(port)

console.log('API running on port: ' + port)

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(session({ secret: "cats" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

passport.use(new LocalStrategy(
    async (username, password, done) => {

        let isFaculty = true;

        await sequelize.query(`SELECT * FROM studentLogin WHERE studentId = ${username}`, { type: sequelize.QueryTypes.SELECT })
            .then((user) => {
                console.log(user)
                if (user[0]) {
                    isFaculty = false
                    if (password == user[0].password) {
                        return done(null, user[0])
                    } else {
                        return done(null)
                    }
                }
            })

        if (isFaculty) {
            await sequelize.query(`SELECT * FROM facultyLogin WHERE facultyId = ${username}`, { type: sequelize.QueryTypes.SELECT })
                .then((user) => {
                    console.log(user[0].facultyId)
                    if (user[0]) {
                        if (password == user[0].password) {
                            return done(null, user[0])
                        } else {
                            return done(null)
                        }
                    }
                })
        }
    }
))

passport.serializeUser((user, done) => {
    console.log('Serializing..')
    console.log(user)
    let id
    id = user.studentId;
    let type = 'student'
    if (!id) { 
        id = user.facultyId
        type = 'faculty'
     }
    console.log(id)
    console.log('End')
    done(null, {user: id, type: type})

})

passport.deserializeUser(function (user, done) {
    console.log('Deserializing..')
    console.log(user)
    console.log('end')
    done(null, user)
});

routes(app)


