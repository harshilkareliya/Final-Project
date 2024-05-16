import React from 'react'

function capitalize(word) {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function Alert(props) {
    return (
        props.alert &&
        <center>
            <div className={`alert alert-${props.alert.type} alertbox`} role="alert">
                <h2> {props.alert.msg}</h2>
            </div>
        </center>
    )
}

export default Alert
