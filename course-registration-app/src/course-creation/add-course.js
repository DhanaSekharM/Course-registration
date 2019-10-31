
import React from 'react'
import { Header, Navigator } from './../faculty-common'
import CreateCourseForm from './create-course-form'
import styles from './../css/profile.module.css'
import axios from 'axios'

class AddCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inEditMode: true,
            courseDetails: {
                code: '',
                name: '',
                prerequisites: '',
                type: '',
                semester: '',
            },
            timeslot: [
                {
                    day: 'Monday',
                    time: '08:00:00-09:00:00'
                }
            ],
            requested: false,
            timeslots: 1
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async makeRequest() {
        let res = await axios.get('/faculty/courses/'+this.state.courseDetails.code)
        this.setState({
            courseDetails: {
                code: res.data.courseDetails.id,
                name: res.data.courseDetails.name,
                prerequisites: res.data.courseDetails.prerequisites,
                type: res.data.courseDetails.type,
                semester: res.data.courseDetails.semester,
                credit: res.data.courseDetails.credit,
                lecture: res.data.courseDetails.lecture,
                tutorial: res.data.courseDetails.tutorial,
                practical: res.data.courseDetails.practical
            },
            timeslot: res.data.timeslots.slice()
        })
    }

    // updateState(profile) {
    //     console.log(profile)
    //     this.setState({
    //         userDetails: {
    //             id: profile.id,
    //             firstName: profile.name,
    //             email: profile.email,
    //             phoneNumber: '1234567890',
    //             department: 'CSE'
    //         },
    //         requested: true,
    //     })
    // }

    handleChange(event, type, i) {
        console.log(event)
        const courseDetailsCopy = JSON.parse(JSON.stringify(this.state.courseDetails));
        if (type == 'day' || type == 'time') {
            let timeslotCopy = JSON.parse(JSON.stringify(this.state.timeslot));
            if (i == -1) {
                timeslotCopy.push({
                    day: 'Monday',
                    time: '08:00:00-09:00:00'
                })
            } else {
                if (type == 'day') {
                    timeslotCopy[i].day = event.value
                } else {
                    timeslotCopy[i].time = event.value
                }
            }
            this.setState({
                timeslot: timeslotCopy
            })
        } else {
            if (typeof (event.target) == 'undefined') {
                if (typeof (event.value) == 'undefined') {
                    courseDetailsCopy.type = event
                    this.setState({
                        courseDetails: courseDetailsCopy
                    })
                } else {
                    courseDetailsCopy.semester = event.value
                    this.setState({
                        courseDetails: courseDetailsCopy
                    })
                }

            } else {
                const name = event.target.name
                const value = event.target.value
                courseDetailsCopy[name] = value
                // alert(event.target.name)
                this.setState({
                    courseDetails: courseDetailsCopy
                })
            }
        }


    }

    async createCourse() {
        let body = {
            id: this.state.courseDetails.code,
            name: this.state.courseDetails.name,
            type: this.state.courseDetails.type,
            semester: this.state.courseDetails.semester,
            prerequisites: this.state.courseDetails.prerequisites,
            lecture: this.state.courseDetails.lecture,
            tutorial: this.state.courseDetails.tutorial,
            practical: this.state.courseDetails.practical,
            credit: this.state.courseDetails.credit
        }
        return await axios.post('/faculty/courses', body)
    }

    async addTimeslots() {
        let timeslots = []
        for(let i = 0; i < this.state.timeslot.length; i++) {
            let timeslot = {
                id: this.state.courseDetails.code,
                timeslot: this.state.timeslot[i].day + ' ' + this.state.timeslot[i].time
            }
            timeslots.push(timeslot)
        }

        let body = {
            timeslots
        }

        return await axios.post('/faculty/timeslot', timeslots)
    }

    async getTimeslots() {
        // alert('h')
        return await axios.get('/faculty/allTimeslots')
    }

    detectCollision(allTimeslots, timeslots) {
        let collisions = []
        for (let i = 0; i < timeslots.length; i++) {
            for (let j = 0; j < allTimeslots.length; j++) {
                
                if ( (this.state.courseDetails.semester == allTimeslots[j].semester) &&
                     (timeslots[i].day + ' ' + timeslots[i].time) == allTimeslots[j].slot) {
                    collisions.push(allTimeslots[j])
                }
            }
        }
        return collisions
    }

    handleClick(event, type) {

        if (type == 'time') {
            let nt = this.state.timeslot + 1
            let timeslotCopy = JSON.parse(JSON.stringify(this.state.timeslot));
            timeslotCopy.push({
                day: 'Monday',
                time: '08:00:00-09:00:00'
            })
            this.setState({
                timeslots: nt,
                timeslot: timeslotCopy
            })
        }

        if (type == 'save') {
            console.log('121212')
            this.createCourse()
                .then((res) => {
                    console.log(res)
                    this.getTimeslots()
                        .then((out) => {
                            let collisions = this.detectCollision(out.data, this.state.timeslot)

                            if (collisions.length != 0) {
                                let message = 'Course has collision with \n'
                                for (let i = 0; i < collisions.length; i++) {
                                    message += collisions[i].courseId + ' at ' + collisions[i].slot + '\n'
                                }
                                alert(message)
                            } else {
                                this.addTimeslots()
                                    .then((res) => {
                                        // alert('hi')
                                        console.log(res)
                                        this.makeRequest()
                                            .then((out) => { })
                                        window.location.reload()
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                })
                .catch((err) => {
                    console.log(err)
                })
        }

        if(type == 'reset') {
            window.location.reload()
        }

    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        return (
            <div className={styles.body}>
                <Header title='Add Course' value={this.props} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Navigator value={this.props} />
                    <div className={styles.container} style={{ marginLeft: '10px', marginTop: '10px' }}>
                        <CreateCourseForm value={this.state} onChange={this.handleChange} onClick={this.handleClick} />
                    </div>

                </div>
            </div>
        )


    }
}

export default AddCourse