import React from 'react'
import { NavLink } from 'react-router-dom'

function BookmarkEle({ type, title, id }) {
    return (
        <>
            <NavLink to={`/single/${type}/${id}`} className="upload-element">
                <div className="upload-name">{title}</div>
            </NavLink>
        </>
    )
}

export default BookmarkEle