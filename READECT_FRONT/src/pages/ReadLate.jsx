import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../style/Profile.css"
import BookmarkEle from '../components/BookmarkEle';

const bookmarkAPI = "/api/v1/reader/"

function ReadLate() {
    const [type, setType] = useState(0);
    const [poems, setPoems] = useState([]);
    const [articles, setArticles] = useState([]);
    const [stories, setStories] = useState([]);
    const [books, setbooks] = useState([]);
    const getBookmarks = async () => {
        try {
            let resp = await axios.get(`${bookmarkAPI}/poem/get/ReadLater`);
            setPoems(resp.data.data.readLater.poems);
            resp = await axios.get(`${bookmarkAPI}/shortstory/get/ReadLater`);
            setStories(resp.data.data.readLater.shortStories);
            resp = await axios.get(`${bookmarkAPI}/article/get/ReadLater`);
            setArticles(resp.data.data.readLater.articles);

        } catch (error) {

        }
    }

    useEffect(() => {
        getBookmarks();
    }, [])

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
            <div className="my-uploads-area read-late-uploads-area">
                <div className="my-uploads-head">
                    <h3 className="my-uploads-label">Bookmarks</h3>

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
                <div className="my-all-uploads read-late-uploads-all">
                    {
                        type === 0 ?
                            poems?.map((ele, i) => {
                                return (
                                    <BookmarkEle key={i} title={ele.title} id={ele.id} type={"poem"} />
                                )
                            })
                            : type === 1 ?
                                articles?.map((ele, i) => {
                                    return (
                                        <BookmarkEle key={i} title={ele.title} id={ele.id} type={"article"} />
                                    )

                                })
                                : type === 2 ?
                                    stories?.map((ele, i) => {
                                        return (
                                            <BookmarkEle key={i} title={ele.title} id={ele.id} type={"shortstory"} />
                                        )

                                    })
                                    : type === 3 ?
                                        books?.map((ele, i) => {
                                            return (
                                                <BookmarkEle key={i} title={ele.title} id={ele.id} type={"book"} />
                                            )
                                        }) : <></>
                    }
                </div>
            </div >
        </>
    )
}

export default ReadLate