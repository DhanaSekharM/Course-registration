import React from 'react'
import axios from 'axios'

class Get extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            availableCourses: [],
        }
    }

    async makeRequest() {
        return await axios.get('/student/courses', {
            withCredentials: true
        })
            // .then((res) => {
            //     console.log(res)
            //     return res
            // })
    }

    render() {
        // let response

        let response = this.makeRequest()
        console.log(response)
        response.then((res) => {
            console.log(response)
            console.log(res)
        })


        return (
            <h1>Courses Available</h1>
        )
    }

}

export default Get
