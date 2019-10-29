import React from "react";
import styles from "./../css/profile.module.css";

class CreateCourseFrom extends React.Component {
    render() {


        let resetVisibility = this.props.value.inEditMode?'visible':'hidden'
        let text = this.props.value.inEditMode?'Save':'Edit'

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
                    <div>
                        <h2 className={styles.profileLabel}>
                            Profile:
                            <span className={styles.profileName}> Fname </span>
                        </h2>
                        <img src={require("./../assets/profile-placeholder.jpeg")} style={{ maxHeight: '360px', maxWidth: '360px' }} />
                        <br /> <button className={styles.button}> Upload </button>{" "}
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
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "15px"
                                }}
                            >
                                <label className={styles.fieldLabel} style={{ whiteSpace: "nowrap", marginRight: "40px" }}>
                                    Confirm Password{" "}
                                </label>{" "}
                                <input
                                    name="confirmPassword"
                                    style={{ float: "right", width: "700px" }}
                                    type="password"
                                    placeholder="fname@email.com"
                                    disabled={!this.props.value.inEditMode}
                                    className={styles.profileInput}
                                    value=''
                                    onChange={(event) => this.props.onChange(event)}
                                />
                            </div>
                        </form>{" "}
                        <div style={{ marginTop: '-40px' }}>
                            <button className={styles.button} onClick={() => this.props.onClick(text)}>{text}</button>
                            <button className={styles.button} onClick={() => this.props.onClick('reset')} style={{backgroundColor: 'blue', visibility: resetVisibility }}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourseFrom;
