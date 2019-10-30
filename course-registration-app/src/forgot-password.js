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

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            confirmPassword: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event, type) {
        if (type.localeCompare("password") === 0) { this.setState({ password: event.target.value }) }
        else { this.setState({ confirmPassword: event.target.value }) }
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault();
        // axios.post('/login', {
        //     password: this.state.password,
        // })
        //     .then((response) => {
        //         console.log(response);
        //         if (response.data.type == 'student') {
        //             this.props.history.push('/home')
        //         } else {
        //             this.props.history.push('/faculty/home')
        //         }

        //     })
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
                        Forgot Password
            </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New password"
                        type="password"
                        name="password"
                        autoFocus
                        value={this.state.password}
                        onChange={(event) => { this.handleChange(event, 'password') }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Confirmpassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={(event) => { this.handleChange(event, 'confirmPassword') }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                        onClick={this.handleSubmit}
                    >
                        Change Password
              </Button>
                </div>
            </Container>
        );
    }

}

export default ForgotPassword