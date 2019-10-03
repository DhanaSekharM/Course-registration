const controller = require('./../controller/course-controller')


module.exports = (app) => {
    app.route('/courses')
    .get(controller.displayCourseForFaculty)
    .post(controller.addCourse)
}

module.exports = (app) => {
    app.route('/student/courses')
    .get(controller.displayCourseForStudent)
}

module.exports = (app) => {
    app.route('/student/courses/:id')
    .get(controller.registerCourse)
}