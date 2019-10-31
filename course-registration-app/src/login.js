import React from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styles from './css/login.module.css'
import Grid from '@material-ui/core/Grid';

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                if(response.data.type == 'admin') {
                    this.props.history.push('/admin')
                } else
                if (response.data.type == 'student') {
                    this.props.history.push('/home')
                } else if(response.data.type == 'faculty'){
                    this.props.history.push('/faculty/home')
                }
                // if(typeof(this.response.data.type) == 'undefined') {
                //     alert('d')
                // }

            })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
            </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Login Id"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.username}
                        onChange={(event) => { this.handleChange(event, 'username') }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={(event) => { this.handleChange(event, 'password') }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                        onClick={this.handleSubmit}
                    >
                        Sign In
              </Button>
                    
                </div>
            </Container>
        );
    }

}

export default LoginPage