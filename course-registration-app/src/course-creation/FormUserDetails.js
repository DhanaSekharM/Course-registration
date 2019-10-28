import React, { Component } from 'react'
// import MuiThemeProvider from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }
    
    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider maxWidth="xs">
                <React.Fragment>
                    <AppBar title="Enter user details"/>
                    <div id="details" style={{
                        marginTop: 100,
                        marginLeft: 1000
                    }}>
                        <TextField
                            hintText="Course ID"
                            floatingLabelText="Course ID"
                            onChange={handleChange('courseId')}
                            defaultValue={values.courseId}
                        />
                        <br/>

                        <TextField
                            hintText="Course name"
                            floatingLabelText="Course name"
                            onChange={handleChange('coureName')}
                            defaultValue={values.courseName}
                        />
                        <br/>
                        <TextField
                            hintText="Semester"
                            floatingLabelText="Semester"
                            onChange={handleChange('semester')}
                            defaultValue={values.semester}
                        />
                        <br/>
                        <TextField
                            hintText="Prerequisites"
                            floatingLabelText="Prerequisites"
                            onChange={handleChange('prerequisites')}
                            defaultValue={values.prerequisites}
                        />
                        <br/>
                    </div>
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        style={ {
                            marginLeft:800,
                            marginTop:50,
                        }}
                        onClick={this.continue}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button : {
        margin: 15
    }
}

export default FormUserDetails
