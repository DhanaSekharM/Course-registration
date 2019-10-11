var {Course, Faculty, Student, sequelize} = require('../model/models')
// const sequelize = require('sequelize')

let handler;

exports.addCourse = (req, res) => {
    console.log('1')
    console.log(req.user)
    return Course.create({
        id: req.body.id,
        name: req.body.name,
        timeslot: req.body.timeslot,
        type: req.body.type,
        semester: req.body.semester,
        facultyId: req.user,
    }).then((course) => {
        res.send(course)
    })
    .catch(error => {
        res.send(error)
    })
}

exports.displayCourseForFaculty = (req, res) => {
    console.log('2')
    console.log(req.user)
    return Course.findAll({
        where: {
            facultyId: req.user,
        }
    }).then((courses) => {
         res.send(JSON.stringify(courses))
    })
}

exports.displayCourseForStudent = async (req, res) => {
    console.log('3')
    console.log(req.user)
    return sequelize.query(`SELECT course.* FROM course INNER JOIN student ON student.semester = course.semester where student.id = ${req.user}`, {type: sequelize.QueryTypes.SELECT})
                    .then((courses) => {
                        res.send(JSON.stringify(courses))
                    })
}

exports.registerCourse = async (req, res) => {
    console.log('4')
    let id
    let courseId
    courseId = String(req.params.id)
    console.log(courseId)

    return sequelize.query(`INSERT INTO registration VALUES('${courseId}', '${req.user}', '${req.body.creation_time}', 'pending')`)
            .then((reg) => {
                res.send(JSON.stringify(reg))
            })
            .catch((err) => {
                res.send(err)
            })
}



// module.exports(handler)