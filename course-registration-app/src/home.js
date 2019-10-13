import React from 'react'
import axios from 'axios'

class Get extends React.Component {


    render() {
        let response
        let axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:3001/'
        })
        axios.get('/student/courses', {
            withCredentials: true
        })
            .then((res) => {
                console.log(res + 'd')
                response = res
            })
        
        console.log(response)

        return(
            <h1>Courses Available</h1>
        )
    } 
    
}

export default Get
