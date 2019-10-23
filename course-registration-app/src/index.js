/* eslint-disable-next-line */

import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import LoginForm from './login'
import HomePage from './home-page/home'
import Get from './courses/courses-available'


const routing = (
    <Router>
        <div>
            <Route path = '/login' component = {LoginForm}/>
            <Route path = '/home' component = {HomePage}/>
            <Route exact path = '/student/courses' component = {Get}/>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))