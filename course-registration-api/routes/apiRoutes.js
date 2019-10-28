const controller = require('../controller/student-course-controller')
const facultyController = require('../controller/faculty-course-controller')
const passport = require('passport')

// module.exports = (app) => {
//     app.route('/')
// }

module.exports = (app) => {

    app.route('/student/courses')
        .get(controller.displayCourseForStudent)


    app.route('/student/courses/:id')
        .post(controller.registerCourse)
        .delete(controller.deleteCourse)

    app.route('/login')
        .post(passport.authenticate('local'),
            (req, res) => {
                res.send({ status: 'success' })
            })
    app.route('/error')
        .get((req, res) => {
            res.send({ 'status': 'error' })
        })
    app.route('/student/reg-courses')
        .get(controller.viewRegisteredCourses)

    app.route('/student/pending-courses')
        .get(controller.viewPendingCourses)

    app.route('/student/approved-courses')
        .get(controller.viewApprovedCourses)

    app.route('/student/profile')
        .get(controller.displayProfile)
        .post(controller.updateProfile)

    app.route('/faculty/approve-course')
        .post(facultyController.approveCourse)

    app.route('/faculty/drop-course')
        .delete(facultyController.dropCourse)

    app.route('/faculty/timeslot')
        .post(facultyController.addTimeslot)

    app.route('/faculty/courses')
        .get(facultyController.displayCourse)
        .post(facultyController.addCourse)

    app.route('/faculty/profile')
        .get(facultyController.displayProfile)
        .post(facultyController.updateProfile)




}






