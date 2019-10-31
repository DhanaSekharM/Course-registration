const controller = require('../controller/student-course-controller')
const facultyController = require('../controller/faculty-course-controller')
const adminController = require('../controller/admin-controller')
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
                console.log(req.user)
                let id
                id = req.user.studentId;
                let type = 'student'
                if (!id) {
                    id = req.user.facultyId
                    type = 'faculty'
                }
                if (req.user.id == 'admin') {
                    id = req.user.id,
                        type = 'admin'
                }
                res.send({
                    status: 'success',
                    type: type
                })
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

    app.route('/student/view-timeslot')
        .get(controller.viewTimeslots)

    app.route('/faculty/approve-course')
        .post(facultyController.approveCourse)

    app.route('/faculty/drop-course')
        .post(facultyController.dropCourse)

    app.route('/faculty/timeslot')
        .post(facultyController.addTimeslot)

    app.route('/faculty/courses')
        .get(facultyController.displayCourse)
        .post(facultyController.addCourse)

    app.route('/faculty/courses/:id')
        .get(facultyController.previewCourse)

    app.route('/faculty/profile')
        .get(facultyController.displayProfile)
        .post(facultyController.updateProfile)

    app.route('/faculty/reg-courses')
        .get(facultyController.viewRegCourses)

    app.route('/faculty/edit-course')
        .post(facultyController.editCourse)

    app.route('/admin/student')
        .post(adminController.createStudent)

    app.route('/admin/faculty')
        .post(adminController.createFaculty)

    app.route('/faculty/allTimeslots')
        .get(facultyController.allTimeslots)




}






