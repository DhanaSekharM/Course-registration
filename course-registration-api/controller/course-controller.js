var {Course, Faculty} = require('../model/models')

let handler;

exports.addCourse = (req, res) => {
    return Course.create({
        id: req.body.id,
        name: req.body.name,
        dept: req.body.dept,
        email: req.body.email,
    }).then((course) => {
        res.send(course)
    })
}

// module.exports(handler)