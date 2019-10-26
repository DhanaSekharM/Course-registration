/* eslint-disable-next-line */

import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import LoginForm from './login'
import HomePage from './home-page/home'
import Get from './courses/courses-available'
import PendingCourses from './courses/pending-courses'
import ApprovedCourses from './courses/approved-courses'
import TimeTableApp from './timetable/timetable'


const routing = (
    <Router>
        <div>
            <Route path = '/login' component = {LoginForm}/>
            <Route path = '/home' component = {HomePage}/>
            <Route exact path = '/student/courses' component = {Get}/>
            <Route path = '/student/pending-courses' component = {PendingCourses}/>
            <Route path = '/student/approved-courses' component = {ApprovedCourses}/>
            <Route path = '/student/timetable' component = {TimeTableApp}/>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))