import React from 'react'
import { NavLink } from "react-router-dom";

const SingleUnit = ({ content, type }) => {
    return (
        <NavLink className='content-item mx-auto' to={`/single/${type}/${content.id}`}>
            <figure><img src={content.coverImage} alt="" /></figure>
            <p>{content.title}</p>
        </NavLink>
    )
}


export default SingleUnit;