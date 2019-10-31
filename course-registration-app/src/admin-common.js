import React from 'react'
import styles from './css/home.module.css'

class Header extends React.Component {

    handleLogoClick() {
        this.props.value.history.push('/admin')
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={styles.header}>
                    <h1 className={styles.box} onClick={() => this.handleLogoClick()}>OCR</h1>
                </div>
                <div className={styles.pageTitle}>
                    <h1 style={{ display: 'inline-block' }}>{this.props.title}</h1>
                </div>
            </div>
        )
    }
}

class Navigator extends React.Component {

    handleNavClick(page) {
        switch (page) {
            case 'addStudent':
                // alert('s')
                this.props.value.history.push('/admin/student')
                break
            case 'addFaculty':
                // alert('f')
                this.props.value.history.push('/admin/faculty')
                break
        }
    }

    render() {
        return (
            <div style={{ marginTop: '-15px' }}>
                <ul className={styles.navList}>
                    <li className={styles.menuLi}>Menu</li>
                    <li className={styles.li} onClick={() => this.handleNavClick('addStudent')}>Add Student</li>
                    <li className={styles.li} onClick={() => this.handleNavClick('addFaculty')}>Add Faculty</li>
                </ul>
            </div>
        )
    }
}

export { Header, Navigator }