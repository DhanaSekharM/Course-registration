var {Course, Faculty, Student, sequelize} = require('../model/models')
// const sequelize = require('sequelize')

let handler;

exports.addCourse = (req, res) => {
    console.log('1')
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
    console.log('2')
    return Course.findAll({
        where: {
            facultyId: req.body.id,
        }
    }).then((courses) => {
         res.send(JSON.stringify(courses))
    })
}

exports.displayCourseForStudent = async (req, res) => {
    console.log('3')
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

    return sequelize.query(`SELECT course.* FROM course INNER JOIN student ON student.semester = course.semester where student.id = ${id}`, {type: sequelize.QueryTypes.SELECT})
                    .then((courses) => {
                        res.send(JSON.stringify(courses))
                    })
}

exports.registerCourse = async (req, res) => {
    console.log('4')
    let id
    // await Student.findAll({
    //     where: {
    //         id: req.body.id,
    //     }
    // }).then((student) => {
    //     console.log(student)
    //     id = student[0].dataValues.id;
    //     console.log(id)
    // })

    let courseId
    courseId = req.params.id
    console.log(courseId)

    return sequelize.query(`INSERT INTO registration VALUES(${courseId}, ${req.body.student_id}, ${req.body.creation_time}, "pending")`)
            .then((reg) => {
                res.send(JSON.stringify(reg))
            })
}



// module.exports(handler)