
import React from 'react'
import { Header, Navigator } from './../faculty-common'
import CreateCourseForm from './../course-creation/create-course-form'
import styles from './../css/profile.module.css'
import axios from 'axios'

class EditCourse extends React.Component {
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
                credit: '',
                lecture: '',
                tutorial: '',
                practical: '',
                plan: ''
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

    // updateState(profile) {
    //     console.log(profile)
    //     this.setState({
    //         userDetails: {
    //             id: profile.id,
    //             firstName: profile.name,
    //             email: profile.email,
    //             phoneNumber: '1234567890',
    //             department: profile.dept,
    //             type: profile.type
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
            credit: this.state.courseDetails.credit,
            plan: this.state.courseDetails.plan
        }
        return await axios.post('/faculty/edit-course', body)
    }

    async addTimeslots() {
        let timeslots = []
        for (let i = 0; i < this.state.timeslot.length; i++) {
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
        return await axios.get('/faculty/allTimeslots')
    }

    detectCollision(allTimeslots, timeslots) {
        let collisions = []
        for (let i = 0; i < timeslots.length; i++) {
            for (let j = 0; j < allTimeslots.length; j++) {

                if ((this.state.courseDetails.semester == allTimeslots[j].semester) &&
                    (timeslots[i].day + ' ' + timeslots[i].time) == allTimeslots[j].slot &&
                    (this.state.courseDetails.code != allTimeslots[j].id)) {
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
                                let message = ''
                                for (let i = 0; i < collisions.length; i++) {
                                    message += collisions[i] + ', '
                                }
                                alert(message)
                            } else {
                                this.addTimeslots()
                                    .then((res) => {
                                        // alert('hi')
                                        console.log(res)
                                        this.makeRequest()
                                            .then((out) => { })
                                            alert('Succesfully edited course')
                                            this.props.history.push('/faculty/home')
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

        if (type == 'reset') {
            window.location.reload()
        }

    }

    async makeRequest() {
        let res = await axios.get('/faculty/courses/' + this.props.location.state.courseId)
        let timeslots = []
        for (let i = 0; i < res.data.timeslots.length; i++) {
            let timeslot = {
                day: res.data.timeslots[i].slot.split(' ')[0],
                time: res.data.timeslots[i].slot.split(' ')[1],
            }
            console.log(res.data.timeslots[i].slot.split(' '))
            timeslots.push(timeslot)
        }
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
                practical: res.data.courseDetails.practical,
                plan: res.data.courseDetails.plan
            },
            timeslot: timeslots.slice(),
            requested: true
        })
    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        if (!this.state.requested) {
            this.makeRequest()
        }

        if (this.state.requested) {
            return (
                <div className={styles.body}>
                    <Header title='Profile' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props} />
                        <div className={styles.container} style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <CreateCourseForm value={this.state} onChange={this.handleChange} onClick={this.handleClick} />
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

export default EditCourse