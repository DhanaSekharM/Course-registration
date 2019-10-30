import React from 'react'
import { Header, Navigator } from './../faculty-common'
import Profile from './user-profile'
import styles from './../css/profile.module.css'
import axios from 'axios'

class FacultyProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inEditMode: false,
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
                sex: ''

            },
            requested: false,
            imgUrl: null,
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    async makeRequest() {
        return await axios.get('/faculty/profile')
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
                sex: profile.sex
            },
            requested: true,
        })
    }

    handleChange(event) {
        const userDetailsCopy = JSON.parse(JSON.stringify(this.state.userDetails));
        console.log(event)
        if (typeof (event.target) == 'undefined') {
            userDetailsCopy.sex = event
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

    handleUpload(event) {
        // alert(event.target.files[0])
        this.setState({
            imgUrl: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
          })
    }

    async updateProfile() {
        let body = {
            email: this.state.userDetails.email,
            password: this.state.userDetails.password,
            firstName: this.state.userDetails.firstName,
            middleName: this.state.userDetails.middleName,
            lastName: this.state.userDetails.lastName,
            sex: this.state.userDetails.sex,
            phone: this.state.userDetails.phone
            
        }
        return await axios.post('/faculty/profile', body)
    }

    handleClick(type) {

        switch (type) {
            case 'Save':
                this.updateProfile().then((res) => {
                    window.location.reload()
                })
                break
            case 'Edit':
                this.setState({
                    inEditMode: true,
                }
                )
                break
            case 'reset':
                window.location.reload()
                break
        }

    }

    render() {
        document.body.style.backgroundColor = 'whitesmoke'

        if (!this.state.requested) {
            let response = this.makeRequest()
            console.log(response)
            response.then((res) => {
                console.log(res)
                this.updateState(res.data[0])
            })
        }

        if (this.state.requested) {
            return (
                <div className={styles.body}>
                    <Header title='Profile' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props} />

                        <div className={styles.container} style={{ marginLeft: '10px', marginTop: '10px' }}>
                            <Profile value={this.state} onChange={this.handleChange} onClick={this.handleClick} handleUpload={this.handleUpload}/>
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

export default FacultyProfile