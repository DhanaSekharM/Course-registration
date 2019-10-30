import React from 'react'
import axios from 'axios'
import MenuCard from './../home-page/menu-card'
import LongCard from './../home-page/long-card'
import styles from './../css/home.module.css'
import { Header, Navigator } from './../faculty-common'
class FacultyHomePage extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            offeredCourses: [],
            pendingCourses: [],
            approvedCourses: [],
            requested: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(page) {
        switch (page) {
            case 'pending':
                this.props.history.push('/faculty/reg-courses')
                break
            case 'offered':
                this.props.history.push('/faculty/courses')
                break
            case 'approved':
                this.props.history.push('/student/approved-courses')
            case 'addCourse':
                this.props.history.push('/faculty/add-course')
        }
    }

    async makeRequest() {
        let offeredCourses = await axios.get('/faculty/courses')
        let pendingCourses = await axios.get('/student/pending-courses')
        let approvedCourses = await axios.get('/student/approved-courses')

        return {
            offeredCourses: offeredCourses.data,
            pendingCourses: pendingCourses.data,
            approvedCourses: approvedCourses.data,
        }
    }

    updateState(courses) {
        // console.log(courses.data[0])
        this.setState({
            offeredCourses: courses.offeredCourses,
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

        var offeredCourses = {
            color: 'orange',
            courses: this.state.offeredCourses.slice()
        }

        var approvedCourses = {
            color: 'green',
            courses: this.state.approvedCourses.slice()
        }

        if (this.state.requested) {
            console.log(offeredCourses)
            return (
                <div className={styles.home}>
                    <Header title='Dashboard' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props}/>
                        <div style={{ marginLeft: '5%', marginTop: '3%' }} onClick={() => this.handleClick('addCourse')}>
                            <MenuCard title='Add Course'/>
                        </div>
                        <div style={{ marginTop: '3%', marginLeft: '3%' }} onClick={() => this.handleClick('pending')}>
                            <MenuCard title='Approve/Drop Course' />
                        </div>
                        <div style={{ marginTop: '3%', marginLeft: '3%' }} onClick={() => this.handleClick('offered')}>
                            <LongCard value={offeredCourses} title='Offered Courses'/>
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

export default FacultyHomePage