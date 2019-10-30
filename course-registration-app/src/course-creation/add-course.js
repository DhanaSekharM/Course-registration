
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
                code: res.courseDetails.id,
                name: res.courseDetails.name,
                prerequisites: res.courseDetails.type,
                type: res.courseDetails.type,
                semester: res.courseDetails.semester,
            },
            timeslot: res.timeslots.slice()
        })
    }

    updateState(profile) {
        console.log(profile)
        this.setState({
            userDetails: {
                id: profile.id,
                firstName: profile.name,
                email: profile.email,
                phoneNumber: '1234567890',
                department: 'CSE'
            },
            requested: true,
        })
    }

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
            prerequisites: this.state.courseDetails.prerequisites
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

        if(type == 'save') {
            this.createCourse()
                .then((res) => {
                    console.log(res)
                    this.addTimeslots()
                        .then((res) => {
                            console.log(res)
                            this.makeRequest()
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
                <Header title='Profile' value={this.props} />
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