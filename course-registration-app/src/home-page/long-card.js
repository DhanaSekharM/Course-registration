import React from 'react'
import styles from './../css/home.module.css'
import { ExpansionPanel } from '@material-ui/core'
import { lineHeight, borderColor } from '@material-ui/system'

class LongCard extends React.Component {
    
    renderCard(i) {
        return(
            <div>
                <h3 style={{color: '#565656', lineHeight: '1px'}}>{i.id}</h3>
                <h5>{i.name}</h5>
            </div>
        )
    }

    render() {
        let title = 'Available Courses'
        if(this.props.value.color == 'red') title = 'Pending Courses'
        if(this.props.value.color == 'green') title = 'Approved Courses'
        console.log(this.props.value)
        return(
            <div className={styles.longCard} style={{borderColor:this.props.value.color}}>
                <div>
                    <h1 style={{lineHeight: '2px', fontFamily: 'arial', marginTop:'10%'}}>{this.props.courses.length}</h1>
                    <h4 style={{color: '#878787', fontFamily:'Times New Roman'}}>{title}</h4>
                </div>
                {this.props.value.courses.map(this.renderCard)}
            </div>
        )
    }
}

export default LongCard