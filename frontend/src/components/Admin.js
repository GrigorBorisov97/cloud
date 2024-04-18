import React from 'react';
import AdminImg from '../assets/images/software-engineer.png';


const Admin = (props) => {
    return (
        <div className='admin-container'>
            <img src={AdminImg} style={{width: 50}} />
            <h2>Hello, {props.user}</h2>
        </div>
    )
}

export default Admin;