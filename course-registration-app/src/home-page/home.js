import React from 'react'
import axios from 'axios'
import AccountIcon from '@material-ui/icons/AccountBox'
import CourseIcon from '@material-ui/icons/LibraryBooks'
import { IconButton, Button } from '@material-ui/core'
import MenuCard from './../home-page/menu-card'
import LongCard from './../home-page/long-card'
import { style } from '@material-ui/system'
import styles from './../css/home.module.css'
import { Header, Navigator } from './../common'
class HomePage extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            availableCourses: [],
            pendingCourses: [],
            approvedCourses: [],
            requested: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(page) {
        switch (page) {
            case 'pending':
                this.props.history.push('/student/pending-courses')
                break
            case 'available':
                this.props.history.push('/student/courses')
                break
            case 'approved':
                this.props.history.push('/student/approved-courses')
            case 'timetable':
                this.props.history.push('/student/timetable')
        }
    }

    async makeRequest() {
        let availableCourses = await axios.get('/student/courses')
        let pendingCourses = await axios.get('/student/pending-courses')
        let approvedCourses = await axios.get('/student/approved-courses')

        return {
            availableCourses: availableCourses.data,
            pendingCourses: pendingCourses.data,
            approvedCourses: approvedCourses.data,
        }
    }

    updateState(courses) {
        // console.log(courses.data[0])
        this.setState({
            availableCourses: courses.availableCourses,
            pendingCourses: courses.pendingCourses,
            approvedCourses: courses.approvedCourses,
            requested: true
        })
        
    }

    render() {
        document.body.style.backgroundColor = "whitesmoke";

        if (!this.state.requested) {
            let response = this.makeRequest()
            console.log(response)
            response.then((res) => {
                // console.log(response)
                console.log((res))
                this.updateState(res)
            })
        }

        var pendingCourses = {
            color: 'red',
            courses: this.state.pendingCourses.slice()
        }

        var availableCourses = {
            color: 'orange',
            courses: this.state.availableCourses.slice()
        }

        var approvedCourses = {
            color: 'green',
            courses: this.state.approvedCourses.slice()
        }

        if (this.state.requested) {
            console.log(availableCourses)
            return (
                <div className={styles.home}>
                    <Header title='Dashboard' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props}/>
                        <div style={{ marginLeft: '5%', marginTop: '3%' }} onClick={() => this.handleClick('timetable')}>
                            <MenuCard />
                        </div>
                        <div style={{ marginTop: '3%', marginLeft: '3%' }} onClick={() => this.handleClick('available')}>
                            <LongCard value={availableCourses} />
                        </div>
                        <div style={{ marginTop: '3%', marginLeft: '3%' }} onClick={() => this.handleClick('pending')}>
                            <LongCard value={pendingCourses} />
                        </div>
                        <div style={{ marginTop: '3%', marginLeft: '3%' }} onClick={() => this.handleClick('approved')}>
                            <LongCard value={approvedCourses} />
                        </div>
                    </div>


                </div>


            )
        } else {
            return (
                <div>
                    <h1>Loading..</h1>
                </div>
            )

        }


    }
}

export default HomePage