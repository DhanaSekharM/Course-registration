var { Course, Faculty, Student, sequelize } = require('../model/models')

exports.addCourse = (req, res) => {
    console.log('f1')
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

exports.displayCourse = (req, res) => {
    console.log('f2')
    console.log(req.user)
    return Course.findAll({
        where: {
            facultyId: req.user,
        }
    }).then((courses) => {
        res.send(JSON.stringify(courses))
    })
}

exports.approveCourse = (req, res) => {
    console.log('f3')

    body = req.body

    sequelize.query(`UPDATE registration SET status = 'approved' WHERE courseId = '${body.courseId}' AND studentId = '${body.studentId}'`)
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(JSON.stringify(err))
        })
}

exports.addTimeslot = (req, res) => {
    console.log('f4')
    body = req.body

    sequelize.query(`INSERT INTO timeslot VALUES('${body.courseId}', '${body.timeslot}')`)
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(JSON.stringify(err))
        })
}

exports.dropCourse = (req, res) => {
    console.log('f5')
    body = req.body
    sequelize.query(`DELETE FROM registration WHERE courseId='${body.courseId}' AND studentId='${body.studentId}'`)
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(JSON.stringify(err))
        })
    
}