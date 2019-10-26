var { Course, Faculty, Student, sequelize } = require('../model/models')

exports.approveCourse = (req, res) => {
    console.log('f1')

    body = req.body

    sequelize.query(`UPDATE registration SET status = 'approved' WHERE courseId = '${body.courseId}' AND studentId = '${body.studentId}'`)
            .then((out) => {
                res.send(JSON.stringify(out))
            })
            .catch((err) => {
                res.send(JSON.stringify(err))
            })
}