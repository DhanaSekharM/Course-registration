import React from 'react'
import AccountIcon from '@material-ui/icons/AccountBox'
import CourseIcon from '@material-ui/icons/LibraryBooks'
import { IconButton, Button } from '@material-ui/core'
import MenuCard from './../home-page/menu-card'
import LongCard from './../home-page/long-card'
import { style } from '@material-ui/system'
import styles from './../css/home.module.css'
class HomePage extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(page) {
        switch (page) {
            case 'profile':
                break
            case 'available':
                this.props.history.push('/student/courses')
                break
        }
    }

    render() {
        document.body.style.backgroundColor = "whitesmoke";
        var pendingCourses = {
            color: 'red',
            courses: ['CO123', 'CO234', 'CO456']
        }

        var availableCourses = {
            color: 'orange',
            courses: ['CO123', 'CO234', 'CO456', 'CO123', 'CO123', 'CO123', 'CO123','CO123']
        }

        var approvedCourses = {
            color: 'green',
            courses: ['CO123', 'CO234', 'CO456']
        }

        return (
            <div className={styles.home}>
                <div className={styles.header}>
                    <h1 className={styles.box}>OCR</h1>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{ marginLeft: '15%', marginTop: '10%' }}>
                        <MenuCard />
                    </div>
                    <div style={{ marginTop: '10%', marginLeft: '3%' }} onClick={() => this.handleClick('available')}>
                        <LongCard value={availableCourses} />
                    </div>
                    <div style={{ marginTop: '10%', marginLeft: '3%' }} onClick={() => this.handleClick('pending')}>
                        <LongCard value={pendingCourses} />
                    </div>
                    <div style={{ marginTop: '10%', marginLeft: '3%' }} onClick={() => this.handleClick('approved')}>
                        <LongCard value={approvedCourses} />
                    </div>
                </div>


            </div>


        )

    }
}

export default HomePage