const controller = require('./../controller/course-controller')

// module.exports = (app) => {
//     app.route('/')
// }

module.exports = (app) => {
    app.route('/courses')
        .get(controller.displayCourseForFaculty)
        .post(controller.addCourse)

    app.route('/student/courses')
        .get(controller.displayCourseForStudent)


    app.route('/student/courses/:id')
        .post(controller.registerCourse)



}



