/* eslint-disable-next-line */

import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import LoginForm from './login'
import Get from './home'


const routing = (
    <Router>
        <div>
            <Route path = '/login' component = {LoginForm}/>
            <Route exact path = '/student/courses' component = {Get}/>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))