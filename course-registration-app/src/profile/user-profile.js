import React from "react";
import styles from "./../css/profile.module.css";
import { RadioGroup, RadioButton } from 'react-radio-buttons'


function create_blob(file, callback) {
    var reader = new FileReader();
    reader.onload = function() { callback(reader.result) };
    reader.readAsDataURL(file);
}

class Profile extends React.Component {
    render() {


        let resetVisibility = this.props.value.inEditMode ? 'visible' : 'hidden'
        let text = this.props.value.inEditMode ? 'Save' : 'Edit'
        let imgUrl = require('./../assets/profile-placeholder.jpeg')
        var imageToBlob = require('image-to-blob')

        


        if (this.props.value.imgUrl != null) {
            create_blob(this.props.value.file, (blob) => {
                console.log(blob)
            })           
        }

        let maleCheck = false, femaleCheck = false
        if(this.props.value.userDetails.sex == 'Male' || this.props.value.userDetails.sex == 'male') {
            maleCheck = true
        } else {
            femaleCheck = true
        }

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                    <div>
                        <h2 className={styles.profileLabel}>
                            Profile:
                            <span className={styles.profileName}> {this.props.value.userDetails.firstName} </span>
                        </h2>
                        <img src={imgUrl} style={{ maxHeight: '360px', maxWidth: '360px' }} />
                        <br /> <input type='file' onChange={(event) => this.props.handleUpload(event)} />
                    </div>
                    <div className={styles.formHeading}>
                        <div>
                            <h3 className={styles.profileHeading} style={{ display: "inline" }}>Account Information</h3>
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
                                    Id{" "}
                                </label>
                                <input
                                    name="id"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="fname@email.com"
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.id}
                                    disabled={true}
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
                                    Password{" "}
                                </label>
                                <input
                                    name="password"
                                    style={{ float: "right", width: "700px" }}
                                    type="password"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value=''
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>{" "}
                        </form>{" "}
                        <hr />
                        <div style={{ marginTop: '20px' }}>
                            <h3 className={styles.profileHeading} style={{ display: "inline" }}>Profile Information </h3>{" "}
                        </div>
                        <form style={{ marginTop: "2%", marginLeft: "10%" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "100px" }}>
                                    {" "}
                                    First Name{" "}
                                </label>
                                <input
                                    name="firstName"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.firstName}
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
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", float: "left", marginRight: "80px" }}>
                                    {" "}
                                    Middle Name{" "}
                                </label>
                                <input
                                    name="middleName"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.middleName}
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
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "100px" }}>
                                    {" "}
                                    Last Name{" "}
                                </label>
                                <input
                                    name="lastName"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.lastName}
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
                                <label className={styles.fieldLabel} style={{ float: "left", marginRight: "150px" }}>Gender</label>
                                <RadioGroup horizontal onChange={(event) => this.props.onChange(event)}>
                                    <RadioButton checked={maleCheck} name='sex' value='male'>Male</RadioButton>
                                    <RadioButton checked={femaleCheck} name='sex' value='female'>Female</RadioButton>
                                </RadioGroup>
                            </div>{" "}
                        </form>{" "}
                        <hr />
                        <div style={{ marginTop: '20px' }}>
                            <h3 className={styles.profileHeading} style={{ display: "inline" }}>Contact Information </h3>{" "}
                        </div>{" "}
                        <form style={{ marginTop: "2%", marginLeft: "10%" }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ marginRight: "140px" }}> Email </label>{" "}
                                <input
                                    name="email"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.email}
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
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", float: "left", marginRight: "70px" }}>Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    style={{ float: "right", width: "700px" }}
                                    type="text"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.phone}
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
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "90px" }}>Department</label>
                                <input
                                    name="department"
                                    style={{ float: "right", width: "700px" }}
                                    value="hi"
                                    type="text"
                                    placeholder="fname@email.com"
                                    disabled={true}
                                    className={styles.profileInput}
                                    value={this.props.value.userDetails.department}
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                        </form>
                        <div style={{ marginTop: '-40px' }}>
                            <button className={styles.button} onClick={() => this.props.onClick(text)}>{text}</button>
                            <button className={styles.button} onClick={() => this.props.onClick('reset')} style={{ backgroundColor: 'blue', visibility: resetVisibility }}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
