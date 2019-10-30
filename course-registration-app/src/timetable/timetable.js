import React, { Component } from 'react'
import moment from 'moment';

import TimeTable from 'react-timetable-events'
import Axios from 'axios';
import { Header, Navigator } from './../common'

class TimeTableApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      events: {
        monday: [
          {
            id: 1,
            name: 'Custom Event 1',
            type: 'custom',
            startTime: moment("2018-02-23T08:00:00"),
            endTime: moment("2018-02-23T09:00:00")
          }
        ],
        tuesday: [
          {
            id: 2,
            name: 'Custom Event 4',
            type: 'custom',
            startTime: moment("2018-02-22T12:30:00"),
            endTime: moment("2018-02-22T14:30:00")
          },
          {
            id: 3,
            name: 'Custom Event 3',
            type: 'custom',
            startTime: moment("2018-02-22T16:30:00"),
            endTime: moment("2018-02-22T17:00:00")
          }
        ],
        wednesday: [],
        thursday: [],
        friday: []
      },
      requested: false
    }
    this.makeRequest = this.makeRequest.bind(this)
  }

  renderHour(hour, defaultAttributes, styles) {
    return (
      <div {...defaultAttributes}
        key={hour}>
        {hour}h
      </div>
    );
  }

  renderEvent(event, defaultAttributes, styles) {
    return (
      <div {...defaultAttributes}
        title={event.name}
        key={event.id}>
        <span className={styles.event_info}>
          {event.name}
        </span>
        <span className={styles.event_info}>
          {event.startTime.format('HH:mm')} - {event.endTime.format('HH:mm')}
        </span>
      </div>
    )
  }

  async makeRequest() {
    return await Axios.get('/student/view-timeslot')
  }

  updateState(timeslots) {
    let events = {}

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const monday = [], tuesday = [], wednesday = [], thursday = [], friday = []
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < timeslots.length; j++) {
        console.log(timeslots[j].name)
        let timeslot = timeslots[j].slot
        let day = timeslot.split(' ')[0]
        let time = timeslot.split(' ')[1]
        let startTime = time.split('-')[0]
        let endTime = time.split('-')[1]
        console.log(1)
        switch (day) {
          case 'Monday':
            monday.push({
              name: timeslots[j].name,
              startTime: moment('2018-02-22T' + startTime),
              endTime: moment('2018-02-22T' + endTime),
            })
            break;
          case 'Tuesday':
            tuesday.push({
              name: timeslots[j].name,
              startTime: moment('2018-02-22T' + startTime),
              endTime: moment('2018-02-22T' + endTime),
            })
            break;
          case 'Wednesday':
            tuesday.push({
              name: timeslots[j].name,
              startTime: moment('2018-02-22T' + startTime),
              endTime: moment('2018-02-22T' + endTime),
            })
            break;
          case 'Thursday':
            thursday.push({
              name: timeslots[j].name,
              startTime: moment('2018-02-22T' + startTime),
              endTime: moment('2018-02-22T' + endTime),
            })
            break;
          case 'Friday':
            friday.push({
              name: timeslots[j].name,
              startTime: moment('2018-02-22T' + startTime),
              endTime: moment('2018-02-22T' + endTime),
            })
            break;
        }
      }
    }

    events = {
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday
    }
    console.log(events)
    this.setState({
      events: events,
      requested: true
    })
  }

  render() {

    if (!this.state.requested) {
      this.makeRequest()
        .then((timelsots) => {
          this.updateState(timelsots.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    if (this.state.requested) {
      return (
        <div>
          <Header title='Timetable' value={this.props} />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Navigator value={this.props} />
            <div style={{width:'100%'}}>
            <TimeTable
              events={this.state.events}
              renderHour={this.renderHour}
              renderEvent={this.renderEvent}
              hoursInterval={[8, 17]}
              timeLabel="Time :)"
            />
            </div>
            
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }

  }
}

export default TimeTableApp