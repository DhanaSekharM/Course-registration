var {Course, Faculty, Student, sequelize} = require('../model/models')
// const sequelize = require('sequelize')

let handler;

exports.addCourse = (req, res) => {
    return Course.create({
        id: req.body.id,
        name: req.body.name,
        timeslot: req.body.timeslot,
        type: req.body.type,
        semester: req.body.semester,
        facultyId: req.body.facultyId,
    }).then((course) => {
        res.send(course)
    })
}

exports.displayCourseForFaculty = (req, res) => {
    return Course.findAll({
        where: {
            facultyId: req.body.id,
        }
    }).then((courses) => {
         res.send(JSON.stringify(courses))
    })
}

exports.displayCourseForStudent = async (req, res) => {
    let id
    await Student.findAll({
        where: {
            id: req.body.id,
        }
    }).then((student) => {
        console.log(student)
        id = student[0].dataValues.id;
        console.log(id)
    })
    // console.log(id)

    return sequelize.query(`SELECT course.name FROM course INNER JOIN student ON student.semester = course.semester where student.id = ${id}`, {type: sequelize.QueryTypes.SELECT})
                    .then((courses) => {
                        res.send(JSON.stringify(courses))
                    })
}



// module.exports(handler)