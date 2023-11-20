import React from 'react';
import NavLink from 'react-bootstrap/esm/NavLink';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

function RequestLogin() {
    let navigate = useNavigate();
    return (
        <>
            <div className='rqst-login-popup'>
                <div className='rqst-back'>
                    <button className='rqst-back' onClick={() => navigate(-1)}><BiArrowBack /></button>
                </div>
                <h2>Please Login To Continue</h2>
                <NavLink onClick={() => { navigate("/login") }}><button className='rqst-login-btn'>Login</button></NavLink>
            </div>
        </>
    )
}

export default RequestLogin