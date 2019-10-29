import React from 'react'
import styles from './../css/home.module.css'

class MenuCard extends React.Component {
    
    render() {
        let title = 'Time Table'
        if(typeof(this.props.title) != 'undefined') {
            title = 'Add Course'
        }
        return (
            <div className={styles.smallCard}>
                <div style={{padding: '10px',}}>
                    <h2 align='right' display={'inline'}>{title}</h2>
                </div>
                <div style={{marginLeft: '50px', marginTop: '12px'}}>
                    <img src={require('./../assets/timetable.png')} />
                </div>
            </div>
        )
    }
}

export default MenuCard