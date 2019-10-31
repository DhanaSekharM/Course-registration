import React from 'react'
import axios from 'axios'
import CourseCard from './course-card'
import styles from './../css/course.module.css'
import { Navigator, Header } from './../common'


function twoCards(course1, course2, clickHandler) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard
                    value={course1}
                    onApplyClick={() => clickHandler('delete', course1.id)} onViewClick={() => clickHandler('view', course1.id, course1)}
                    button1='Delete'
                    button2='View'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard value={course2}
                    onApplyClick={() => clickHandler('delete', course2.id)} onViewClick={() => clickHandler('view', course2.id, course2)}
                    button1='Delete'
                    button2='View'
                />
            </div>

        </div>
    )
}

function oneCard(course, clickHandler) {
    return (
        <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
            <CourseCard value={course}
                onApplyClick={() => clickHandler('delete', course.id)} onViewClick={() => clickHandler('view', course.id, course)}
                button1='Delete'
                button2='View'
            />
        </div>
    )
}

class PendingCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pendingCourses: [],
            requested: false,
        }
    }

    async makeRequest() {
        let pendingCourses = await axios.get('/student/pending-courses')
        console.log(pendingCourses)
        return pendingCourses
    }

    updateState(pendingCourses) {
        console.log(pendingCourses)
        this.setState({
            pendingCourses: pendingCourses.data,
            requested: true,
        })
    }

    clickHandler(type, courseId, course) {
        if (type == 'delete') {
            axios.delete('/student/courses/'+courseId)
                .then((res) => {
                    window.location.reload()
                })
        } else {
            let plan = course.plan
            console.log(plan)
            var win = window.open(plan, '_blank');
            win.focus();
        }
        // alert('clicked')
    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        if (!this.state.requested) {
            let response = this.makeRequest()
            console.log(response)
            response.then((res) => {
                console.log(res)
                this.updateState(res)
            })
        }

        if (this.state.requested) {
            let cards = []

            let courses = this.state.pendingCourses.slice()

            for (let i = courses.length - 1; i >= 0; i = i - 2) {
                if (i == 0) {
                    cards.push(oneCard(courses[i], this.clickHandler))
                } else {
                    cards.push(twoCards(courses[i], courses[i - 1], this.clickHandler))
                }

            }
            return (
                <div className={styles.body}>
                    <Header title='Pending Courses' value={this.props} />
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

export default PendingCourses