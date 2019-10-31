var { Course, Faculty, Student, sequelize } = require('../model/models')


exports.displayProfile = (req, res) => {
    console.log('fac details requested')

    return sequelize.query(`SELECT * FROM faculty WHERE id='${req.user.user}'`, { type: sequelize.QueryTypes.SELECT })
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.updateProfile = (req, res) => {
    let body = req.body
    return sequelize.query(`UPDATE faculty SET 
                            firstName = '${body.firstName}',
                            middleName = '${body.middleName}',
                            lastName = '${body.lastName}',
                            sex = '${body.sex}',
                            phone = '${body.phone}',
                            email = '${body.email}'
                            WHERE id = '${req.user.user}'`)
        .then((out) => {
            sequelize.query(`UPDATE facultyLogin SET 
                                        password='${body.password}'
                                        WHERE facultyId='${req.user.user}'`)
                .then((out1) => {
                    res.send(JSON.stringify(out1))
                })
                .catch((err) => {
                    res.send(JSON.stringify(err))
                })
        })
        .catch((err) => {
            res.send(JSON.stringify(err))
        })
}

exports.addCourse = (req, res) => {
    console.log('f1')
    console.log(req.user.user)
    console.log(req.body)
    // return Course.create({
    //     id: req.body.id,
    //     name: req.body.name,
    //     timeslot: 'null',
    //     type: req.body.type,
    //     semester: req.body.semester,
    //     facultyId: req.user.user,
    // }).then((course) => {
    //     res.send(course)
    // })
    //     .catch(error => {
    //         res.send(error)
    //     })

    return sequelize.query(`INSERT INTO course VALUES('${req.body.id}', '${req.body.name}', 
                    '${req.body.type}', '${req.body.semester}', '${req.user.user}', '${req.body.prerequisites}', ${req.body.credit}, ${req.body.lecture},
                    ${req.body.tutorial}, ${req.body.practical})`)
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(JSON.stringify(err))
        })
}

exports.displayCourse = (req, res) => {
    console.log('f2')
    console.log(req.user.user)
    return Course.findAll({
        where: {
            facultyId: req.user.user,
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
    console.log(req.body[0])
    body = req.body

    sequelize.query(`DELETE FROM timeslot WHERE courseId='${body[0].id}'`)
        .then((out) => {
            for (let i = 0; i < body.length; i++) {
                sequelize.query(`INSERT INTO timeslot VALUES('${body[i].id}', '${body[i].timeslot}')`)
                    .then((out) => {
                        res.send(JSON.stringify(out))
                    })
                    .catch((err) => {
                        res.send(JSON.stringify(err))
                    })
            }
        })
        .catch((out) => {

        })



}

exports.dropCourse = (req, res) => {
    console.log('f5')
    body = req.body
    sequelize.query(`UPDATE registration SET status = 'dropped' WHERE courseId = '${body.courseId}' AND studentId = '${body.studentId}'`)
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(JSON.stringify(err))
        })

}

exports.previewCourse = (req, res) => {
    let courseId = req.params.id
    let response
    sequelize.query(`SELECT * FROM course WHERE id='${courseId}'`, { type: sequelize.QueryTypes.SELECT })
        .then((out) => {
            sequelize.query(`SELECT * FROM timeslot WHERE courseId='${courseId}'`, { type: sequelize.QueryTypes.SELECT })
                .then((out1) => {
                    response = {
                        courseDetails: out[0],
                        timeslots: out1
                    }
                    res.send(response)
                })
                .catch((err) => {
                    res.send(err)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
}

exports.viewRegCourses = (req, res) => {

    sequelize.query(`SELECT student.*, course.name AS cname, course.id AS cid, registration.status FROM student INNER JOIN registration INNER JOIN course 
                    ON student.id = registration.studentId AND course.id = registration.courseId 
                    WHERE facultyId = '${req.user.user}'`, { type: sequelize.QueryTypes.SELECT })
        .then((courses) => {
            res.send(JSON.stringify(courses))
        })
        .catch((err) => {
            res.send(err)
        })


}

exports.editCourse = (req, res) => {
    sequelize.query(`UPDATE course SET  id = '${req.body.id}',
                                        name = '${req.body.name}', 
                                        type = '${req.body.type}', 
                                        semester = '${req.body.semester}', 
                                        prerequisites = '${req.body.prerequisites}',
                                        credit= ${req.body.credit},
                                        lecture= ${req.body.lecture},
                                        tutorial= ${req.body.tutorial},
                                        practical= ${req.body.practical}
                                        WHERE id='${req.body.id}'`)
        .then((out) => {
            res.send(out)
        })
        .catch((out) => {
            res.send(out)
        })

}

exports.allTimeslots = (req, res) => {
    sequelize.query('select course.*, timeslot.*, faculty.dept from timeslot inner join course inner join faculty on timeslot.courseId = course.id and faculty.id = course.facultyId', { type: sequelize.QueryTypes.SELECT })
        .then((out) => {
            res.send(JSON.stringify(out))
        })
        .catch((err) => {
            res.send(err)
        })
} 