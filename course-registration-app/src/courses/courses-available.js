import React from 'react'
import axios from 'axios'
import CourseCard from './course-card'
import { Header, Navigator } from './../common'
import styles from './../css/course.module.css'


function twoCards(course1, course2, clickHandler) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard
                    value={course1} onApplyClick={() => clickHandler('apply', course1.id)}
                    onViewClick={() => clickHandler('view')}
                    button1='Apply'
                    button2='View'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard
                    value={course2}
                    onApplyClick={() => clickHandler('apply', course2.id)} onViewClick={() => clickHandler('view')}
                    button1='Apply'
                    button2='View'
                />
            </div>

        </div>
    )
}

function oneCard(course, clickHandler) {
    return (
        <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
        <CourseCard
            value={course}
            onApplyClick={() => clickHandler('apply', course.id)} onViewClick={() => clickHandler('view')}
            button1='Apply'
            button2='View'
        />
    </div>
    )
}

class Get extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            availableCourses: [],
            registeredCourses: [],
            requested: false,
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    async makeRequest() {
        let availableCourses = await axios.get('/student/courses', {
            withCredentials: true
        })
        let registeredCourses = await axios.get('/student/reg-courses')
        
        console.log(registeredCourses)
        return {
            availableCourses: availableCourses,
            registeredCourses: registeredCourses
        }
    }

    updateState(availableCourses, registeredCourses) {
        this.setState({
            availableCourses: availableCourses.data.slice(),
            registeredCourses: registeredCourses.data.slice(),
            requested: true,
        })
    }

    clickHandler(type, courseId) {
        if (type == 'apply') {
            axios.post('/student/courses/' + courseId)
                .then((res) => {
                    window.location.reload()
                })
        }
    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        if (!this.state.requested) {
            let response = this.makeRequest()
            console.log(response)
            response.then((res) => {
                console.log(res)
                this.updateState(res.availableCourses, res.registeredCourses)
            })
        }


        let cards = []

        let courses = this.state.availableCourses.slice()

        for (let i = 0; i < courses.length; i++) {
            courses[i]['applied'] = false
            for (let j = 0; j < this.state.registeredCourses.length; j++) {
                if (courses[i].id == this.state.registeredCourses[j].courseId) {
                    courses[i].applied = true
                }
            }
        }
        console.log(courses)

        for (let i = this.state.availableCourses.length - 1; i >= 0; i = i - 2) {
            if (i == 0) {
                cards.push(oneCard(courses[i], this.clickHandler))
            } else {
                cards.push(twoCards(courses[i], courses[i - 1], this.clickHandler))
            }

        }

        if (this.state.requested) {
            return (
                <div className={styles.body}>
                    <Header title='Available Courses' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props}/>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {cards.map((card) => { return card })}
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <hi>Loading...</hi>
                </div>
            )
        }

    }

}

export default Get
