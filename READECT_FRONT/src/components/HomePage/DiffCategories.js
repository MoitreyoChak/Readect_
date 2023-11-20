import { NavLink } from 'react-router-dom';
import { RiArticleLine } from "react-icons/ri";
import { SiStorybook } from "react-icons/si";
import { MdHistoryEdu } from "react-icons/md";
import { TbBooks } from "react-icons/tb";


function DiffCategories() {
    return (
        <>
            <div className='diffcategories-part' id='typesid'>
                <div className='diffcategories'>
                    <div className='title'>Explore</div>
                    <div className='container'>
                        <div className="row">
                            {/* Articles s */}
                            <div className="col-md-5 col-12 mx-auto">
                                <div className="box categories-box">
                                    <NavLink to="/type/articles">
                                        <div className="our-category articles">
                                            <div className="icon mx-auto d-flex justify-content-center align-items-center">
                                                <RiArticleLine />
                                            </div>
                                            <h4>Articles</h4>
                                            <p>You can read some amazing Articles written by people all over the world.</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>

                            {/* Poems  */}
                            <div className="col-md-5 col-12 mx-auto">
                                <div className="box categories-box">
                                    <NavLink to="/type/poems">
                                        <div className="our-category poems">
                                            <div className="icon mx-auto d-flex justify-content-center align-items-center">
                                                <MdHistoryEdu />
                                            </div>
                                            <h4>Poems</h4>
                                            <p>Read some of the amazing Poems written by creative People all over the world.</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            {/* ShortStories  */}
                            <div className="col-md-5 col-12 mx-auto">
                                <div className="box categories-box">
                                    <NavLink to="/type/shortstories">
                                        <div className="our-category shortstories">
                                            <div className="icon mx-auto d-flex justify-content-center align-items-center">
                                                <SiStorybook />
                                            </div>
                                            <h4>Short Story</h4>
                                            <p>Read the amazing Stories written by creative People all over the world.</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>

                            {/* Books  */}
                            <div className="col-md-5 col-12 mx-auto">
                                <div className="box categories-box">
                                    <NavLink to="/type/books">
                                        <div className="our-category books">
                                            <div className="icon mx-auto d-flex justify-content-center align-items-center">
                                                <TbBooks />
                                            </div>
                                            <h4>Books</h4>
                                            <p>Read some of the amazing Books/Novels written by creative People all over the world.</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiffCategories