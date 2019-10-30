import React from 'react'
import CourseCard from './reg-course-card'
import axios from 'axios'



function twoCards(course1, course2, clickHandler) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard
                    value={course1}
                    onApproveClick={() => clickHandler('approve', course1.cid, course1.id)} onDropClick={() => clickHandler('drop', course1.cid, course1.id)}
                    button1='Approve'
                    button2='Drop'
                />
            </div>
            <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
                <CourseCard value={course2}
                    onApproveClick={() => clickHandler('approve', course2.cid, course1.id)} onDropClick={() => clickHandler('drop', course1.cid, course1.id)}
                    button1='Approve'
                    button2='Drop'
                />
            </div>

        </div>
    )
}

function oneCard(course, clickHandler) {
    return (
        <div style={{ width: '400px', margin: '40px 40px 40px 100px' }}>
            <CourseCard value={course}
                onApproveClick={() => clickHandler('approve', course.cid, course.id)} onDropClick={() => clickHandler('drop', course.cid, course.id)}
                button1='Approve'
                button2='Drop'
            />
        </div>
    )
}

class RegisteredCourses extends React.Component {


    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }


    async approveCourse(courseId, studentId) {
        let body = {
            courseId: courseId,
            studentId: studentId
        }
        return await axios.post('/faculty/approve-course', body)
    }

    async dropCourse(courseId, studentId) {
        let body = {
            courseId: courseId,
            studentId: studentId
        } 
        return await axios.post('/faculty/drop-course', body)
    }

    clickHandler(type, courseId, studentId) {
        switch (type) {
            case 'approve':
                this.approveCourse(courseId, studentId)
                    .then((res) => {
                        window.location.reload()
                    })
                break
            case 'drop':
                alert('droppd')
                    this.dropCourse(courseId, studentId)
                    .then((res) => {
                        window.location.reload()
                    })
                break
        }
    }

    render() {
        let cards = []


        console.log(this.props)
        let courses = this.props.value.slice()

        for (let i = courses.length - 1; i >= 0; i = i - 2) {
            if (i == 0) {
                cards.push(oneCard(courses[i], this.clickHandler))
            } else {
                cards.push(twoCards(courses[i], courses[i - 1], this.clickHandler))
            }

        }
        return (
            <div>
                <h3>
                    {this.props.value[0].cname}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {cards.map((card) => { return card })}
                </div>
            </div>
        )
    }
}

export default RegisteredCourses