import React from 'react'
import styles from './../css/course.module.css'

class CourseCard extends React.Component {

    render() {
        return (
            <div className={styles.courseCard}>
                <div style={{}}>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block',marginTop:'0', marginBottom:'0'}}><b>CO123</b></p>
                    <p style={{ fontFamily: 'Times', fontSize: '24px', display: 'inline-block', marginTop:'0', marginBottom:'0', marginLeft: '60%'}}><b>4(1-2-1)</b></p>
                </div>


                <div style={{overflow: 'auto'}}>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>Name of the course</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>Faculty Name</p>
                    <p style={{ fontFamily: 'Palatino', fontSize: '16px', }}>Prerequisites: </p>
                </div>

                <div style={{  margin:'0'}}>
                    <button className={styles.button} style={{marginLeft:'2px'}}>
                        View
                    </button>
                    <button className={styles.button} style={{backgroundColor:'green'}}>
                        Apply
                    </button>
                </div>
            </div>
        )

    }
}

export default CourseCard