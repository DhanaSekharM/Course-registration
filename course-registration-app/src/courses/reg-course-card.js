import React from 'react'
import styles from './../css/course.module.css'

class CourseCard extends React.Component {
    render() {
        let dropButtonColor = 'red'
        if(this.props.value.status == 'dropped') dropButtonColor = 'gray'

        // if()
        return (
            <div className={styles.courseCard}>
                <div style={{}}>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop: '0', marginBottom: '0' }}><b>{this.props.value.id}</b></p>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop: '0', marginBottom: '0', marginLeft: '60%' }}><b>CGPA: {(this.props.value.cgpa)}</b></p>
                </div>


                <div style={{ overflow: 'auto' }}>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>{this.props.value.firstName}</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>Department: {this.props.value.dept}</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>Semester: {this.props.value.semester} </p>
                </div>

                <div style={{ margin: '0' }}>
                    <button
                        disabled={this.props.value.status=='dropped'?true:false}
                        className={styles.button}
                        style={{ marginLeft: '2px', backgroundColor: dropButtonColor }}
                        onClick={this.props.onDropClick}
                    >
                        {this.props.button2}
                    </button>
                    <button
                        disabled={this.props.value.status=='approved'?true:false}
                        className={styles.button}
                        style={{  }}
                        onClick={this.props.onApproveClick}

                    >
                        {this.props.button1}
                    </button>
                </div>
            </div>
        )

    }
}

export default CourseCard