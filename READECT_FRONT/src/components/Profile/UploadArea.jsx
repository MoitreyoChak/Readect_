import React from 'react'
import { AwesomeButton } from 'react-awesome-button'
import { NavLink } from 'react-router-dom'

function UploadArea() {
    return (
        <>
            <div className='content-upload-area my-5'>
                <NavLink to="/upload">
                    <AwesomeButton className='upload-btn' type='secondary'>Upload</AwesomeButton>
                </NavLink>
                <NavLink to="/profile/library">
                    <AwesomeButton className='upload-btn' type='secondary'>Bookmarks</AwesomeButton>
                </NavLink>

            </div>
        </>
    )
}

export default UploadArea