import React from 'react'
import axios from 'axios'
import CourseCard from './course-card'
import {Header, Navigator} from './../common'
import styles from './../css/course.module.css'

class Get extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            availableCourses: [],
        }
    }

    async makeRequest() {
        return await axios.get('/student/courses', {
            withCredentials: true
        })
            // .then((res) => {
            //     console.log(res)
            //     return res
            // })
    }

    render() {
        // let response
        document.body.style.backgroundColor = 'whitesmoke'
        let response = this.makeRequest()
        console.log(response)
        response.then((res) => {
            console.log(response)
            console.log(res)
        })


        return (
            <div className={styles.body}>
                <Header value='Available Courses'/>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Navigator/>
                    
                    <CourseCard/>
                </div>
                
                
            </div>
        )
    }

}

export default Get
