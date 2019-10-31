var { Course, Faculty, Student, sequelize } = require('../model/models')

exports.createStudent = (req, res) => {
    return sequelize.query(`INSERT INTO student VALUES('${req.body.id}', '${req.body.firstName}', '${req.body.middleName}', 
                            '${req.body.lastName}', '${req.body.dept}', '${req.body.cgpa}', '${req.body.semester}', 
                            '${req.body.email}', '${req.body.sex}', 'Bangalore', '2021', '${req.body.phone}', '${req.body.blob}')`)
                            .then((out) => {
                                console.log(out)
                                res.send(JSON.stringify(out))
                                sequelize.query(`INSERT INTO studentLogin VALUES('${req.body.id}', '${req.body.password}')`)
                            })
                            .catch((err) => {
                                console.log(err)
                                res.send(err)
                            })
}

exports.createFaculty = (req, res) => {
    return sequelize.query(`INSERT INTO faculty VALUES('${req.body.id}', '${req.body.firstName}', '${req.body.middleName}', 
                            '${req.body.lastName}', '${req.body.dept}',
                            '${req.body.email}', '${req.body.sex}','${req.body.phone}', 'Bangalore')`)
                            .then((out) => {
                                res.send(JSON.stringify(out))
                                sequelize.query(`INSERT INTO facultyLogin VALUES('${req.body.id}', '${req.body.password}')`)
                            })
                            .catch((err) => {
                                res.send(err)
                            })
}