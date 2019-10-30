import React from 'react'
import axios from 'axios'
import CourseCard from './course-card'
import styles from './../css/course.module.css'
import { Navigator, Header } from './../common'


function threeCards(course1, course2, course3, clickHandler) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '400px', margin: '40px 40px 40px 50px' }}>
                <CourseCard
                    value={course1}
                    onApplyClick={() => clickHandler('delete', course1.id)} onViewClick={() => clickHandler('view')}
                    button1='Delete'
                    button2='View'
                    approved='true'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 50px' }}>
                <CourseCard value={course2}
                    onApplyClick={() => clickHandler('delete', course2.id)} onViewClick={() => clickHandler('view')}
                    button1='Delete'
                    button2='View'
                    approved='true'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 50px' }}>
                <CourseCard value={course2}
                    onApplyClick={() => clickHandler('delete', course3.id)} onViewClick={() => clickHandler('view')}
                    button1='Delete'
                    button2='View'
                    approved='true'
                />
            </div>
            
        </div>
        
    )
}

function twoCards(course1, course2, clickHandler) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard
                    value={course1}
                    onApplyClick={() => clickHandler('delete', course1.id)} onViewClick={() => clickHandler('view')}
                    button1='Delete'
                    button2='View'
                    approved='true'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard value={course2}
                    onApplyClick={() => clickHandler('delete', course2.id)} onViewClick={() => clickHandler('view')}
                    button1='Delete'
                    button2='View'
                    approved='true'
                />
            </div>

        </div>
    )
}

function oneCard(course, clickHandler) {
    return (
        <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
            <CourseCard value={course}
                onApplyClick={() => clickHandler('delete', course.id)} onViewClick={() => clickHandler('view')}
                button1='Delete'
                button2='View'
                approved='true'
            />
        </div>
    )
}

class ApprovedCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            approvedCourses: [],
            requested: false,
        }
    }

    async makeRequest() {
        let approvedCourses = await axios.get('/student/approved-courses')
        console.log(approvedCourses)
        return approvedCourses
    }

    updateState(approvedCourses) {
        console.log(approvedCourses)
        this.setState({
            approvedCourses: approvedCourses.data,
            requested: true,
        })
    }

    clickHandler(type, courseId) {
        if (type == 'delete') {
            // axios.delete('/student/courses/'+courseId)
            //     .then((res) => {
            //         window.location.reload()
            //     })
        }
        alert('clicked')
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

            let courses = this.state.approvedCourses.slice()

            for (let i = courses.length - 1; i >= 0; i = i - 3) {
                if (i == 0) {
                    cards.push(oneCard(courses[i], this.clickHandler))
                    // cards.push(threeCards(courses[i], courses[i], courses[i],  this.clickHandler))
                } else if(i == 1){
                    cards.push(twoCards(courses[i], courses[i - 1], this.clickHandler))
                } else {
                    cards.push(threeCards(courses[i], courses[i - 1], courses[i-2],  this.clickHandler))
                }

            }
            return (
                <div className={styles.body}>
                    <Header title='Approved Courses' value={this.props} />
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

export default ApprovedCourses