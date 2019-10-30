import React from "react";
import styles from "./../css/profile.module.css";
import { RadioGroup, RadioButton } from 'react-radio-buttons'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class CreateCourseFrom extends React.Component {

    timeslot(i) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        const time = ['08:00:00-09:00:00', '09:00:00-10:00:00', '10:00:00-11:00:00', '11:00:00-12:00:00', '13:00:00-14:00:00', '14:00:00-15:00:00', '15:00:00-16:00:00', '16:00:00-17:00:00']
        console.log(i)
        
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "15px"
                }}
            >
                <Dropdown
                    className={{}}
                    placeholderClassName={styles.placeholder}
                    options={days}
                    onChange={(event) => this.props.onChange(event, 'day', i)}
                    value={this.props.value.timeslot[i].day}
                    placeholder='Select Day'
                />
                <Dropdown
                    className={{}}
                    placeholderClassName={styles.placeholder}
                    options={time}
                    onChange={(event) => this.props.onChange(event, 'time', i)}
                    value={this.props.value.timeslot[i].time}
                    placeholder='Select Time'
                />
            </div>
        )
    }

    render() {

        let indexes = []

        for (let i = 0; i < this.props.value.timeslot.length; i++) {
            indexes.push(i)
        }
        console.log(this.props.value.timeslot.length)

        let electiveCheck = false, mandatoryCheck = false, openElectiveCheck = false
        if(this.props.value.courseDetails.type == 'elective') electiveCheck = true
        if(this.props.value.courseDetails.type == 'mandatory') mandatoryCheck = true
        if(this.props.value.courseDetails.type == 'openElective') openElectiveCheck = true

        let resetVisibility = this.props.value.inEditMode ? 'visible' : 'hidden'
        let text = this.props.value.inEditMode ? 'Save' : 'Edit'

        const semesters = ['1', '2', '3', '4', '5', '6', '7', '8']

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                    <div>
                        <h2 className={styles.profileLabel}>
                            <span className={styles.profileName}> Course </span>
                        </h2>
                    </div>
                    <div className={styles.formHeading}>
                        <div>
                            <h3 className={styles.profileHeading} style={{ display: "inline" }}>Course Information</h3>
                        </div>
                        <form style={{ marginTop: "2%", marginLeft: "10%" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ marginRight: "170px" }}>
                                    {" "}
                                    Code{" "}
                                </label>
                                <input
                                    name="code"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg CO111"
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.code}
                                    disabled={!this.props.value.inEditMode}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ float: "left", marginRight: "110px" }}>
                                    {" "}
                                    Name{" "}
                                </label>
                                <input
                                    name="name"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg Database Management System"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.name}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>{" "}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ float: "left", marginRight: "110px" }}>
                                    {" "}
                                    Prerequisites{" "}
                                </label>
                                <input
                                    name="prerequisites"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg None"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.prerequisites}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>{" "}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ marginRight: "170px" }}>
                                    {" "}
                                    Credits{" "}
                                </label>
                                <input
                                    name="credit"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg 4"
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.credit}
                                    disabled={!this.props.value.inEditMode}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ marginRight: "170px" }}>
                                    {" "}
                                    Lecture{" "}
                                </label>
                                <input
                                    name="lecture"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg 3"
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.lecture}
                                    disabled={!this.props.value.inEditMode}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ marginRight: "170px" }}>
                                    {" "}
                                    Tutorial{" "}
                                </label>
                                <input
                                    name="tutorial"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg 1"
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.tutorial}
                                    disabled={!this.props.value.inEditMode}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ marginRight: "170px" }}>
                                    {" "}
                                    Practical{" "}
                                </label>
                                <input
                                    name="practical"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="eg 1"
                                    className={styles.profileInput}
                                    value={this.props.value.courseDetails.practical}
                                    disabled={!this.props.value.inEditMode}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "40px" }}>
                                    Semester{" "}
                                </label>{" "}
                                <Dropdown
                                    className={{}}
                                    placeholderClassName={styles.placeholder}
                                    options={semesters}
                                    onChange={(event) => this.props.onChange(event)}
                                    value={this.props.value.courseDetails.semester}
                                    placeholder='Select a semester'
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "40px" }}>
                                    Type{" "}
                                </label>{" "}
                                <RadioGroup horizontal onChange={(event) => this.props.onChange(event)}>
                                    <RadioButton checked={electiveCheck} name='type' value='elective'>Department Elective</RadioButton>
                                    <RadioButton checked={mandatoryCheck} name='type' value='mandatory'>Mandatory</RadioButton>
                                    <RadioButton checked={openElectiveCheck} name='type' value='openElective'>Open Elective</RadioButton>
                                </RadioGroup>
                            </div>
                        </form>{" "}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                margin: "15px"
                            }}
                        >
                            <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "40px" }}>
                                Timeslots{" "}
                            </label>{" "}
                            <button onClick={(event) => this.props.onClick(event, 'time')}>Add timeslot</button>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {indexes.map((i) => this.timeslot(i))}
                            </div>

                        </div>
                        <div style={{ marginTop: '-40px' }}>
                            <button className={styles.button} onClick={(event) => this.props.onClick(event, 'save')}>{text}</button>
                            <button className={styles.button} onClick={(event) => this.props.onClick(event, 'reset')} style={{ backgroundColor: 'blue', visibility: resetVisibility }}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourseFrom;
