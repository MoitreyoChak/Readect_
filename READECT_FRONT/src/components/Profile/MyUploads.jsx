import { useState } from "react";
import { NavLink } from "react-router-dom";

import { MdAdd } from 'react-icons/md';
import "react-awesome-button/dist/styles.css";
import { useProfileContext } from "../../context/ProfileContext";
import UploadEle from "./UploadEle";

const MyUploads = () => {
    const [type, setType] = useState(0);
    const { myPoems, myArticles, myBooks, myShortStories } = useProfileContext();
    console.log(myPoems);

    const DisplayType = (e, x) => {
        e.preventDefault();
        const btns = document.querySelectorAll(".show-type-btn");
        btns.forEach(ele => {
            ele.classList.remove("type-active");
        });
        e.target.classList.add("type-active");
        setType(x);
    }

    return (
        <>
            <div className="my-uploads-area">
                <div className="my-uploads-head">
                    <h3 className="my-uploads-label">My Uploads</h3>
                    <NavLink to="/upload" className=" upload-btn"><MdAdd /> </NavLink>
                </div>
                <div className="show-type">
                    <div className="show-type-btn type-active" onClick={(e) => DisplayType(e, 0)}>
                        Poems
                    </div>
                    <div className="show-type-btn" onClick={(e) => {
                        DisplayType(e, 1)
                    }}>
                        Articles
                    </div>
                    <div className="show-type-btn" onClick={(e) => {
                        DisplayType(e, 2)
                    }}>
                        Stories
                    </div>
                    <div className="show-type-btn" onClick={(e) => {
                        DisplayType(e, 3)
                    }}>
                        Books
                    </div>
                </div>
                <div className="my-all-uploads">
                    {
                        type === 0 ?
                            myPoems?.map((ele, i) => {
                                return (
                                    <UploadEle key={i} title={ele.title} id={ele.id} type={"poem"} />
                                )
                            })
                            : type === 1 ?
                                myArticles?.map((ele, i) => {
                                    return (
                                        <UploadEle key={i} title={ele.title} id={ele.id} type={"article"} />
                                    )

                                })
                                : type === 2 ?
                                    myShortStories?.map((ele, i) => {
                                        return (
                                            <UploadEle key={i} title={ele.title} id={ele.id} type={"shortstory"} />
                                        )

                                    })
                                    : type === 3 ?
                                        myBooks?.map((ele, i) => {
                                            return (
                                                <UploadEle key={i} title={ele.title} id={ele.id} type={"book"} />
                                            )
                                        }) : <></>
                    }
                </div>
            </div >
            {/* <div className="container my-uploads-area">
                <div className="row">
                    <div className="col-md-6 col-11 mx-auto">
                        <div className="row">
                            <h3 className="col-12 text-center my-uploads-label">My Uploads</h3>
                        </div>
                        <div className="row text-center show-type">
                            <div className="col-3 show-type-btn type-active" onClick={(e) => DisplayType(e, 0)}>Poems</div>
                            <div className="col-3 show-type-btn" onClick={(e) => {
                                DisplayType(e, 1)
                            }}>Articles</div>
                            <div className="col-3 show-type-btn" onClick={(e) => DisplayType(e, 2)} > Stories</div>
                            <div className="col-3 show-type-btn" onClick={(e) => DisplayType(e, 3)} >Books</div>
                        </div>
                        <div className="row my-2 my-all-uploads">
                            <div className="col-12">
                                {
                                    type === 0 ?
                                        myPoems?.map((ele, i) => {
                                            return (
                                                <UploadEle key={i} title={ele.title} id={ele.id} type={"poem"} />
                                            )
                                        })
                                        : type === 1 ?
                                            myArticles?.map((ele, i) => {
                                                return (
                                                    <UploadEle key={i} title={ele.title} id={ele.id} type={"article"} />
                                                )

                                            })
                                            : type === 2 ?
                                                myShortStories?.map((ele, i) => {
                                                    return (
                                                        <UploadEle key={i} title={ele.title} id={ele.id} type={"shortstory"} />
                                                    )

                                                })
                                                : type === 3 ?
                                                    myBooks?.map((ele, i) => {
                                                        return (
                                                            <UploadEle key={i} title={ele.title} id={ele.id} type={"book"} />
                                                        )
                                                    }) : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
};

export default MyUploads;
