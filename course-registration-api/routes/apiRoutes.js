const controller = require('./../controller/course-controller')


module.exports = (app) => {
    app.route('/courses')
    .get()
    .post(controller.addCourse)
}