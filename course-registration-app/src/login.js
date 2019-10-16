import React from 'react'
import axios from 'axios'
import loginStyles from './css/login.module.css'

class LoginFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, type) {
        if (type.localeCompare("username") === 0) { this.setState({ username: event.target.value }) }
        else { this.setState({ password: event.target.value }) }
        console.log(this.state)
    }

    handleSubmit(event) {
        let axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:3001'
        })
        event.preventDefault();
        axios.post('/login', {
            username: this.state.username,
            password: this.state.password,
        })
            .then((response) => {
                console.log(response);
                this.props.value.history.push('/student/courses')
            })
    }



    render() {
        return(
            <div align='center'>
                <input className={loginStyles.input} placeholder='Username' type='text' value = {this.state.username} onChange={(event) => this.handleChange(event, "username")}/>
                <br/>
                <input className={loginStyles.input} placeholder='Password' type='password' value={this.state.password} onChange={(event) => this.handleChange(event, "password")} />
                <br/>
                <button className={loginStyles.button} type='button' onClick={this.handleSubmit}>Log In</button>
            </div>
        )
    }

}


class Title extends React.Component {
    render() {
        return (
            <div align='center'>
                <h1 className={loginStyles.loginTitle}><b>Login</b></h1>
                <p>Welcome! Login for Course Registration</p>
            </div>
        )
    }
}

class LoginPage extends React.Component {
    render() {
        return (
            <body className={loginStyles.loginBody}>
                <Title />
                <LoginFields value={this.props}/>
            </body>
        )

    }
}

export default LoginPage;