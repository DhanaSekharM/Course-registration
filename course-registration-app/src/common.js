import React from 'react'
import styles from './css/home.module.css'

class Header extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={styles.header}>
                    <h1 className={styles.box}>OCR</h1>
                </div>
                <div className={styles.pageTitle}>
                    <h1 >{this.props.value}</h1>
                </div>
            </div>
        )
    }
}

class Navigator extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '-15px' }}>
                <ul className={styles.navList}>
                    <li className={styles.li}>Available Courses</li>
                    <li className={styles.li}>Pending Courses</li>
                    <li className={styles.li}>Approved Courses</li>
                    <li className={styles.li}>Graded Courses</li>
                    <li className={styles.li}>Profile</li>
                </ul>
            </div>
        )
    }
}

export { Header, Navigator }