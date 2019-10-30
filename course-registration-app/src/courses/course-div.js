import React from 'react'
import axios from 'axios'
import { Header, Navigator } from '../faculty-common'
import RegisteredCourses from './registered-courses'
import styles from './../css/course.module.css'

class CourseDiv extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            requested: false,
            courses: {}

        }
    }

    updateState(courses) {

        let segCourses = {}
        for (let i = 0; i < courses.length; i++) {
            let t = []
            t.push(courses[i])
            if (typeof (segCourses[courses[i].cid]) == 'undefined') {
                segCourses[courses[i].cid] = t
            } else {
                segCourses[courses[i].cid].push(courses[i])
            }

        }
        console.log(segCourses)
        this.setState({
            requested: true,
            courses: segCourses
        })
    }

    async makeRequest() {
        return await axios.get('/faculty/reg-courses')
    }

    render() {

        if (!this.state.requested) {
            this.makeRequest()
                .then((res) => {
                    this.updateState(res.data)
                })
        }

        if (this.state.requested) {
            let cids = []
            Object.keys(this.state.courses).forEach(function(key,index) {
                cids.push(key)
            });
            return (
                <div className={styles.body}>
                    <Header title='Registrations' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props}/>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {cids.map((cid) => <RegisteredCourses value={this.state.courses[cid]}/>)}
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }


    }
}

export default CourseDiv