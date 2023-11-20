import React from 'react'
import Pagination from './Pagination'
import { useAppContext } from '../../context/AppContext'

function SinglePoemImage() {
    const { singlePoem } = useAppContext();
    return (
        <div className='content-image-area'>
            <figure className='content-img text-center'>
                {
                    singlePoem?.coverImage ?
                        <img src={singlePoem.coverImage} alt="cover" className='content-cover-img img-fluid' /> :
                        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564" alt="cover" className='content-cover-img img-fluid' />
                }
            </figure>
        </div>
    )
}

export default SinglePoemImage