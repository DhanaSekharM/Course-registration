import React from 'react'
import axios from 'axios'
import CourseCard from './course-card'
import { Header, Navigator } from './../faculty-common'
import styles from './../css/course.module.css'

function threeCards(course1, course2, course3, clickHandler) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '400px', margin: '40px 40px 40px 50px' }}>
                <CourseCard
                    value={course1}
                    onApplyClick={() => clickHandler('edit', course1.id)} onViewClick={() => clickHandler('view')}
                    button1='Edit'
                    button2='View'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 40px' }}>
                <CourseCard value={course2}
                    onApplyClick={() => clickHandler('edit', course2.id)} onViewClick={() => clickHandler('view')}
                    button1='Edit'
                    button2='View'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 40px' }}>
                <CourseCard value={course3}
                    onApplyClick={() => clickHandler('edit', course3.id)} onViewClick={() => clickHandler('view')}
                    button1='Edit'
                    button2='View'
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
                    value={course1} onApplyClick={() => clickHandler('edit', course1.id)}
                    onViewClick={() => clickHandler('view')}
                    button1='Edit'
                    button2='View'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard
                    value={course2}
                    onApplyClick={() => clickHandler('edit', course2.id)} onViewClick={() => clickHandler('view')}
                    button1='Edit'
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
            value={course}
            onApplyClick={() => clickHandler('edit', course.id)} onViewClick={() => clickHandler('view')}
            button1='Edit'
            button2='View'/>
        </div>
    )
}

class FacultyOfferedCourses extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            offeredCourses: [],
            requested: false,
        }
        this.clickHandler = this.clickHandler.bind(this)
    }

    async makeRequest() {
        let offeredCourses = await axios.get('/faculty/courses', {
            withCredentials: true
        })
        
        return {
            offeredCourses: offeredCourses,
        }
    }

    updateState(offeredCourses) {
        this.setState({
            offeredCourses: offeredCourses.data.slice(),
            requested: true,
        })
    }

    clickHandler(type, courseId) {
        console.log('edit')
        if (type == 'edit') {
            this.props.history.push('/faculty/edit-course', {courseId: courseId})
        }
    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        if (!this.state.requested) {
            let response = this.makeRequest()
            console.log(response)
            response.then((res) => {
                console.log(res)
                this.updateState(res.offeredCourses)
            })
        }


        let cards = []

        let courses = this.state.offeredCourses.slice()

        console.log(courses)

        for (let i = this.state.offeredCourses.length - 1; i >= 0; i = i - 2) {
            if (i == 0) {
                cards.push(oneCard(courses[i], this.clickHandler))
                // cards.push(threeCards(courses[i], courses[i], courses[i], this.clickHandler))
            } else if (i == 1) {
                cards.push(twoCards(courses[i], courses[i - 1], this.clickHandler))
            } else {
                cards.push(threeCards(courses[i], courses[i - 1], courses[i - 2], this.clickHandler))
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

export default FacultyOfferedCourses
