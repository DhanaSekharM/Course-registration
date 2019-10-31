import React from 'react'
import { Header, Navigator } from './../admin-common'
import Profile from './add-student-form'
import styles from './../css/profile.module.css'
import axios from 'axios'
import { timingSafeEqual } from 'crypto'

class AdminStudentProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inEditMode: true,
            userDetails: {
                id: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                phone: '',
                department: '',
                sex: '',
                semester: '',
                cgpa: '',
                blob: ''

            },
            requested: true,
            imgUrl: null,
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.handleImage = this.handleImage.bind(this)
    }

    async makeRequest() {
        // return await axios.get('/student/profile')
    }

    handleUpload(event) {
        // alert(event.target.files[0])
        this.setState({
            imgUrl: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
          })
    }

    handleImage(blob) {
        const userDetailsCopy = JSON.parse(JSON.stringify(this.state.userDetails));
        userDetailsCopy.blob = blob
        this.setState({
            userDetails: userDetailsCopy
        })
    }

    updateState(profile) {
        console.log(profile)
        this.setState({
            userDetails: {
                id: profile.id,
                firstName: profile.firstName,
                middleName: profile.middleName,
                lastName: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                department: profile.dept,
                sex: profile.sex,
                cgpa: profile.cgpa,
                password: profile.password,
                blob: profile.blob
            },
            requested: true,
        })
    }

    handleChange(event) {
        const userDetailsCopy = JSON.parse(JSON.stringify(this.state.userDetails));
        console.log(event)
        
        if (typeof (event.target) == 'undefined') {
            if (typeof (event.value) == 'undefined') {
                userDetailsCopy.sex = event
                this.setState({
                    userDetails: userDetailsCopy
                })
            } else {
                userDetailsCopy.semester = event.value
                this.setState({
                    userDetails: userDetailsCopy
                })
            }

        } else {
            const name = event.target.name
            const value = event.target.value
            userDetailsCopy[name] = value
        }

        // alert(event.target.name)
        this.setState({
            userDetails: userDetailsCopy
        })
    }

    async updateProfile() {
        let body = {
            id: this.state.userDetails.id,
            email: this.state.userDetails.email,
            password: this.state.userDetails.password,
            firstName: this.state.userDetails.firstName,
            middleName: this.state.userDetails.middleName,
            lastName: this.state.userDetails.lastName,
            sex: this.state.userDetails.sex,
            dept: this.state.userDetails.department,
            semester: this.state.userDetails.semester,
            phone: this.state.userDetails.phone ,
            cgpa: this.state.userDetails.cgpa,
            blob: this.state.userDetails.blob

        }
        console.log(body)
        return await axios.post('/admin/student', body)
    }

    handleClick(type) {

        switch (type) {
            case 'Save':
                this.updateProfile().then((res) => {
                    alert('Succesfully added student')
                    this.props.history.push('/admin/home')
                })
                break
            case 'reset':
                window.location.reload()
                break
        }

    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        // if (!this.state.requested) {
        //     let response = this.makeRequest()
        //     console.log(response)
        //     response.then((res) => {
        //         console.log(res)
        //         this.updateState(res.data[0])
        //     })
        // }

        if (this.state.requested) {
            return (
                <div className={styles.body}>
                    <Header title='Add Student Profile' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props} />

                        <div className={styles.container} style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <Profile value={this.state} onChange={this.handleChange} onClick={this.handleClick} onUpload={this.handleUpload} onBlob={this.handleImage}/>
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

export default AdminStudentProfile