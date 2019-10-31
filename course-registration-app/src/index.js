/* eslint-disable-next-line */

import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import LoginForm from './login'
import HomePage from './home-page/home'
import Get from './courses/available-courses'
import PendingCourses from './courses/pending-courses'
import ApprovedCourses from './courses/approved-courses'
import TimeTableApp from './timetable/timetable'
import FacultyProfile from './profile/faculty-profile'
import StudentProfile from './profile/student-profile'
import FacultyHomePage from './home-page/faculty-home'
import FacultyOfferedCourses from './courses/faculty-offered-courses'
import AddCourse from './course-creation/add-course'
import EditCourse from './courses/faculty-edit-course'
import CourseDiv from './courses/course-div'
import ForgotPassword from './forgot-password'
import AdminHomePage from './admin/admin-home'
import AdminStudentProfile from './admin/add-student-profile'
import AdminFacultyProfile from './admin/add-faculty-profile'
import Check from './admin/check'

const routing = (
    <Router>
        <div>
            <Route path = '/login' component = {LoginForm}/>
            <Route path = '/home' component = {HomePage}/>
            <Route path = '/faculty/home' component = {FacultyHomePage}/>
            <Route exact path = '/student/courses' component = {Get}/>
            <Route path = '/student/pending-courses' component = {PendingCourses}/>
            <Route path = '/student/approved-courses' component = {ApprovedCourses}/>
            <Route path = '/student/timetable' component = {TimeTableApp}/>
            <Route path = '/faculty/profile' component = {FacultyProfile}/>
            <Route path = '/student/profile' component = {StudentProfile}/>
            <Route path = '/faculty/courses' component = {FacultyOfferedCourses}/>
            <Route path = '/faculty/add-course' component = {AddCourse}/>
            <Route path = '/faculty/edit-course' component = {EditCourse}/>
            <Route path = '/faculty/reg-courses' component = {CourseDiv}/>
            <Route path = '/forgot-password' component = {ForgotPassword}/>
            <Route exact path = '/admin' component = {AdminHomePage}/>
            <Route path = '/admin/student' component = {AdminStudentProfile}/>
            <Route path = '/admin/faculty' component = {AdminFacultyProfile}/>
            
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))