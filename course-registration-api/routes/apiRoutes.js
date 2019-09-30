const controller = require('./../controller/course-controller')


module.exports = (app) => {
    app.route('/courses')
    .get(controller.displayCourseForFaculty)
    .post(controller.addCourse)
}