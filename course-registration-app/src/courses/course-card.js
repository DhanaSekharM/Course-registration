import React from 'react'
import styles from './../css/course.module.css'
import { type } from 'os'

class CourseCard extends React.Component {
    render() {
        let button2Color
        let title = 'Course Instructor', value = this.props.value.fname
        if (typeof (this.props.value.fname) == 'undefined') {
            title = 'Semester'
            value = this.props.value.semester
        }

        let cltp = this.props.value.credit + '(' + this.props.value.lecture + '-' + this.props.value.tutorial + '-' + this.props.value.practical + ')'

        // if()

        if (this.props.button1.localeCompare('Delete') == 0) {
            console.log('here')
            button2Color = 'red'
        }
        if (this.props.button1 === 'Apply') {
            button2Color = 'green'
        }
        if (this.props.value.applied) {
            button2Color = 'gray'
        }

        let timeslots = ''
        let timeTitle = ''

        if (typeof (this.props.timeslots) != 'undefined') {
            timeTitle = 'Timeslots:'
            for (let i = 0; i < this.props.timeslots.length; i++) {
                if (this.props.timeslots[i].courseId == this.props.value.id)
                    timeslots += this.props.timeslots[i].slot + ', '
            }
        }



        return (
            <div className={styles.courseCard}>
                <div style={{}}>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop: '0', marginBottom: '0' }}><b>{this.props.value.id}</b></p>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop: '0', marginBottom: '0', marginLeft: '60%' }}><b>{cltp}</b></p>
                </div>


                <div style={{ overflow: 'auto' }}>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}><b>Course: </b> {this.props.value.name}</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}><b>{title}: </b> {value}</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}><b>Prerequisites: </b>{this.props.value.prerequisites} </p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}><b>{timeTitle} </b>{timeslots}</p>
                </div>

                <div style={{ margin: '0' }}>
                    <button
                        className={styles.button}
                        style={{ marginLeft: '2px', backgroundColor: '#3f51b5' }}
                        onClick={this.props.onViewClick}
                        hidden={this.props.button2disable}
                    >
                        {this.props.button2}
                    </button>
                    <button
                        disabled={this.props.value.applied}
                        hidden={this.props.approved == 'true' ? true : false}
                        className={styles.button}
                        style={{ backgroundColor: button2Color }}
                        onClick={this.props.onApplyClick}

                    >
                        {this.props.button1}
                    </button>
                </div>
            </div>
        )

    }
}

export default CourseCard