var { Course, Faculty, Student, sequelize } = require('../model/models')
// const sequelize = require('sequelize')

let handler;

exports.displayProfile = (req, res) => {
    console.log('stu details requested')

    return sequelize.query(`SELECT * FROM student WHERE id='${req.user.user}'`, { type: sequelize.QueryTypes.SELECT })
            .then((out) => {
                res.send(JSON.stringify(out))
            })
            .catch((err) => {
                res.send(err)
            })
}

exports.updateProfile = (req, res) => {
    let body = req.body
    return sequelize.query(`UPDATE student SET 
                            firstName = '${body.firstName}',
                            middleName = '${body.middleName}',
                            lastName = '${body.lastName}',
                            email = '${body.email}'
                            WHERE id = '${req.user.user}'`)
                        .then((out) => {
                            // sequelize.query(`UPDATE facultyLogin SET 
                            //             password='${body.password}'
                            //             WHERE facultyId='${req.user.user}'`)
                            //             .then((out1) => {
                            //                 res.send(JSON.stringify(out1))
                            //             })
                            //             .catch((err) => {
                            //                 res.send(JSON.stringify(err))
                            //             })
                            res.send(JSON.stringify(out))
                        })
                        .catch((err) => {
                            res.send(JSON.stringify(err))
                        })
}

exports.displayCourseForStudent = async (req, res) => {
    console.log('3')
    console.log(req.user.user)
    return sequelize.query(`SELECT course.*, faculty.name as fname FROM student INNER JOIN faculty INNER JOIN course ON student.dept = faculty.dept AND faculty.id=course.facultyId AND student.semester=course.semester WHERE student.id=${req.user.user};`, { type: sequelize.QueryTypes.SELECT })
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

    return sequelize.query(`INSERT INTO registration VALUES('${courseId}', '${req.user.user}', '${req.body.creation_time}', 'pending')`)
        .then((reg) => {
            res.send(JSON.stringify(reg))
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.viewRegisteredCourses = (req, res) => {
    console.log('5')
    return sequelize.query(`SELECT * FROM registration WHERE studentId=${req.user.user}`, { type: sequelize.QueryTypes.SELECT })
        .then((registrations) => {
            res.send(JSON.stringify(registrations))
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.viewPendingCourses = (req, res) => {
    console.log('6')
    return sequelize.
            query(`SELECT course.*, faculty.name AS fname FROM registration INNER JOIN course INNER JOIN faculty ON registration.courseId = course.id
             AND faculty.id = course.facultyId WHERE studentId='${req.user.user}' AND status='pending';`, { type: sequelize.QueryTypes.SELECT })
             .then((pendingCourses) => {
                 res.send(JSON.stringify(pendingCourses))
             })
             .catch((err) => {
                 res.send(err)
             })

}

exports.deleteCourse= (req, res) => {
    console.log('6')
    console.log(req.params.id)
    courseId = req.params.id

    return sequelize.query(`DELETE FROM registration WHERE studentId='${req.user.user}' AND courseId='${courseId}'`)
            .then((del) => {
                res.send(del)
            })
            .catch((err) => {
                res.send(err)
            })
}

exports.viewApprovedCourses = (req, res) => {
    console.log('7')
    
    return sequelize.
            query(`SELECT course.*, faculty.name AS fname FROM registration INNER JOIN course INNER JOIN faculty ON registration.courseId = course.id
             AND faculty.id = course.facultyId WHERE studentId='${req.user.user}' AND status='approved';`, { type: sequelize.QueryTypes.SELECT })
             .then((approvedCourses) => {
                 res.send(JSON.stringify(approvedCourses))
             })
             .catch((err) => {
                 res.send(err)
             })
}

// module.exports(handler)