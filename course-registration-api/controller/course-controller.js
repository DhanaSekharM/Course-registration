var {Course, Faculty} = require('../model/models')

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

// module.exports(handler)