import { useProfileContext } from '../../context/ProfileContext'
import { NavLink } from 'react-router-dom';

import { BsArrowReturnRight } from 'react-icons/bs';

function MyLiked() {
    const { profile } = useProfileContext();
    return (
        <>
            <div className='my-liked-area'>
                <div className='my-liked-label'>My Likes</div>
                <div className='my-liked'>
                    <div className='my-liked-options'>
                        {
                            profile?.likedPoems?.length ?
                                <div className='liked-type'>
                                    <div className='liked-label'>Poems</div>
                                    <div className='liked-elements'>
                                        {
                                            profile.likedPoems.map((ele, i) => {
                                                return (
                                                    <NavLink to={`/single/poem/${ele.id}`} className='liked-element' key={i}>
                                                        <BsArrowReturnRight className='arrow' />{ele.title}
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </div>
                                </div> :
                                <></>
                        }
                        {
                            profile?.likedArticles?.length ?
                                <div className='liked-type'>
                                    <div className='liked-label'>
                                        Articles
                                    </div>
                                    <div className='liked-elements'>
                                        {
                                            profile.likedArticles.map((ele, i) => {
                                                return (
                                                    <NavLink to={`/single/article/${ele.id}`} className='liked-element' key={i}>
                                                        <BsArrowReturnRight className='arrow' />{ele.title}
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </div>
                                </div> :
                                <></>
                        }
                        {
                            profile?.likedShortStories?.length ?
                                <div className='liked-type'>
                                    <div className='liked-label'>
                                        Stories
                                    </div>
                                    <div className='liked-elements'>
                                        {
                                            profile.likedShortStories.map((ele, i) => {
                                                return (
                                                    <NavLink to={`/single/shortstory/${ele.id}`} className='liked-element' key={i}>
                                                        <BsArrowReturnRight className='arrow' />{ele.title}
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </div>
                                </div> :
                                <></>
                        }
                        {
                            profile?.likedBooks?.length ?
                                <div className='liked-type'>
                                    <div className='liked-label'>
                                        Books
                                    </div>
                                    <div className='liked-elements'>
                                        {
                                            profile.likedBooks.map((ele, i) => {
                                                return (
                                                    <NavLink to={`/single/book/${ele.id}`} className='liked-element' key={i}>
                                                        <BsArrowReturnRight className='arrow' />{ele.title}
                                                    </NavLink>
                                                )
                                            })
                                        }
                                    </div>
                                </div> :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyLiked