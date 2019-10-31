import React from 'react'
import axios from 'axios'
import MenuCard from './../home-page/menu-card'
import LongCard from './../home-page/long-card'
import styles from './../css/home.module.css'
import { Header, Navigator } from './../admin-common'
class AdminHomePage extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            requested: true,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(page) {
        switch (page) {
            case 'addStudent':
                // alert('s')
                this.props.history.push('/admin/student')
                break
            case 'addFaculty':
                // alert('f')
                this.props.history.push('/admin/faculty')
                break
        }
    }

    async makeRequest() {
    }

    updateState(courses) {
        // console.log(courses.data[0])

        
    }

    render() {
        document.body.style.backgroundColor = "whitesmoke";

        // if (!this.state.requested) {
        //     let response = this.makeRequest()
        //     console.log(response)
        //     response.then((res) => {
        //         // console.log(response)
        //         console.log((res))
        //         this.updateState(res)
        //     })
        // }

        if (this.state.requested) {
            // console.log(offeredCourses)
            return (
                <div className={styles.home}>
                    <Header title='Dashboard' value={this.props} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Navigator value={this.props}/>
                        <div style={{ marginLeft: '5%', marginTop: '3%' }} onClick={() => this.handleClick('addStudent')}>
                            <MenuCard title='Add Student'/>
                        </div>
                        <div style={{ marginTop: '3%', marginLeft: '3%' }} onClick={() => this.handleClick('addFaculty')}>
                            <MenuCard title='Add Faculty' />
                        </div>
                    </div>
                </div>


            )
        } else {
            return (
                <div>
                    <h1>Loading..</h1>
                </div>
            )

        }


    }
}

export default AdminHomePage