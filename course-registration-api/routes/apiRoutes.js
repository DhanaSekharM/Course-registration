const controller = require('./../controller/course-controller')
const passport = require('passport')

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
        .delete(controller.deleteCourse)

    app.route('/login')
        .post(passport.authenticate('local'), 
        (req, res) => {
            res.send({status: 'success'})
        })
    app.route('/error')
        .get((req, res) => {
            res.send({'status': 'error'})
        })
    app.route('/student/reg-courses')
        .get(controller.viewRegisteredCourses)

    app.route('/student/pending-courses')
        .get(controller.viewPendingCourses)
        

}






