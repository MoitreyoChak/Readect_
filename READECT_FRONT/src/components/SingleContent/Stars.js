import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from 'styled-components';

function Stars({ stars }) {
    const ratingStar = Array.from({ length: 5 }, (ele, i) => {
        let num = i + 0.5;
        return (
            <span key={i}>
                {
                    stars >= i + 1 ? <FaStar /> : stars >= num ? <FaStarHalfAlt /> : <AiOutlineStar />
                }
            </span>
        )
    })
    return (
        <>
            <div className='icon-style'>
                {ratingStar}
                {/* <p>{reviews} customer reviews</p> */}
            </div>
        </>
    )

}

export default Stars