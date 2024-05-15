import React from 'react'
import logo from './img/user_logo.png'
import { TbHome } from "react-icons/tb";

function LeftPanel() {
    return (
        <div className='leftPanel'>
            <div className='user'>
                <img src={logo} alt="" className='user_logo' />
                <span style={{ lineHeight: '0px', marginTop: '-10px', marginLeft: '5px' }}><h5>User Name</h5><br />user@gmail.com</span>
            </div>
            <div className="input-group my-2">
                <input type="text" className="form-control" aria-label="Text input with radio button" />
                <div className="input-group-text">
                    <i className="bi bi-search"></i>
                </div>
            </div>
            <table className="table table-hover">
                <tbody >
                    <tr>
                         <td><i className="bi bi-brightness-high"></i> &nbsp;&nbsp; My Day</td>
                    </tr>
                    <tr>
                        <td><i className="bi bi-star"></i> &nbsp;&nbsp;Important</td>
                    </tr>
                    <tr>
                        <td><i className="bi bi-journal-bookmark"></i> &nbsp;&nbsp;Planned</td>
                    </tr>
                    <tr>
                        <td><i className="bi bi-person"></i> &nbsp;&nbsp;Assign to me</td>
                    </tr>
                    <tr>
                        <td><i className="bi bi-house"></i> &nbsp;&nbsp;Tasks</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LeftPanel
