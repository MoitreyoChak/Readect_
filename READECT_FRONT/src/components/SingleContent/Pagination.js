import React from 'react'
import { NavLink } from "react-router-dom"

function Pagination({ name = "", type }) {
    return (
        <div className='col-12 my-2 ms-2 pagination'>
            <NavLink to={`/type/${type}`}>{type}</NavLink>/{name}
        </div>
    )
}

export default Pagination