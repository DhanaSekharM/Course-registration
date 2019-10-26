import React from 'react'
import styles from './../css/course.module.css'

class CourseCard extends React.Component {
    render() {
        let button2Color

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
        return (
            <div className={styles.courseCard}>
                <div style={{}}>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop: '0', marginBottom: '0' }}><b>{this.props.value.id}</b></p>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop: '0', marginBottom: '0', marginLeft: '60%' }}><b>4(1-2-1)</b></p>
                </div>


                <div style={{ overflow: 'auto' }}>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>{this.props.value.name}</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>{this.props.value.fname}</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>Prerequisites: </p>
                </div>

                <div style={{ margin: '0' }}>
                    <button
                        className={styles.button}
                        style={{ marginLeft: '2px', backgroundColor: '#3f51b5' }}
                        onClick={this.props.onViewClick}
                    >
                        {this.props.button2}
                    </button>
                    <button
                        disabled={this.props.value.applied}
                        hidden={this.props.approved=='true'?true:false}
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