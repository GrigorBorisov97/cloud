import React from 'react';
import AdminImg from '../assets/images/software-engineer.png';


interface AdminProps {
    user: string;
}

const Admin = (props: AdminProps) => {
    return (
        <div className='admin-container'>
            <img src={AdminImg as any} style={{width: 50}} />
            <h2>Hello, {props.user}</h2>
        </div>
    )
}

export default Admin;