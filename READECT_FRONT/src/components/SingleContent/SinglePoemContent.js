import { useEffect, useState } from "react";
import { useSingleContext } from "../../context/SingleContext";
import { useProfileContext } from "../../context/ProfileContext";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsBookmarkCheck, BsFillBookmarkCheckFill } from "react-icons/bs";

const likeAPI = "/api/v1/reader";
const bookmarkAPI = "/api/v1/reader";


function SinglePoemContent({ name, description, author }) {
  const { type, id } = useParams();
  console.log(type, id);
  const { content } = useSingleContext();
  const { profile } = useProfileContext();
  console.log(content);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);


  const checkLike = async () => {
    if (type === "poem") {
      for (let i = 0; i < profile?.likedPoems?.length; i++) {
        if (profile?.likedPoems[i]?.id === content?._id) {
          setLike(true);
          return;
        }
        setLike(false);
      }
    }
    else if (type === "article") {
      for (let i = 0; i < profile?.likedArticles?.length; i++) {
        if (profile?.likedArticles[i]?.id === content?._id) {
          setLike(true);
          return;
        }
        setLike(false);
      }

    }
    else if (type === "shortstory") {
      for (let i = 0; i < profile?.likedShortStories?.length; i++) {
        if (profile?.likedShortStories[i]?.id === content?._id) {
          setLike(true);
          return;
        }
        setLike(false);
      }
    }
  }

  const checkBookmark = async () => {
    if (type === "poem") {
      for (let i = 0; i < profile?.readLater?.poems?.length; i++) {
        if (profile?.readLater?.poems[i] === content?._id) {
          setBookmark(true);
          return;
        }
        setBookmark(false);
      }
    }
    else if (type === "article") {
      for (let i = 0; i < profile?.readLater?.articles.length; i++) {
        if (profile?.readLater?.articles[i] === content?._id) {
          setBookmark(true);
          return;
        }
        setBookmark(false);
      }

    }
    else if (type === "shortstory") {
      for (let i = 0; i < profile?.readLater?.shortStories?.length; i++) {
        if (profile?.likedShortStories[i]?.id === content?._id) {
          setBookmark(true);
          return;
        }
        setBookmark(false);
      }
    }
  }

  useEffect(() => {
    checkLike();
    checkBookmark();
  }, [])


  const Givelike = async (e) => {
    e.preventDefault();
    if (like == true) {
      try {
        const resp = await axios.post(`${likeAPI}/${type}/unlike/${id}`);
        console.log("sd");
        checkLike();
        toast.success(`${type} unliked`)
        setLike(false);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        await axios.post(`${likeAPI}/${type}/like/${id}`);
        checkLike();
        toast.success(`${type} liked`);
        setLike(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const AddBookmark = async (e) => {
    e.preventDefault();
    if (bookmark == false) {
      try {
        await axios.post(`${bookmarkAPI}/${type}/readLater/${id}`);
        checkBookmark();
        toast.success(`Bookmark Added`)
        setBookmark(true);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      try {
        const resp = await axios.post(`${bookmarkAPI}/${type}/removefromReadLater/${id}`);
        checkBookmark();
        console.log(resp);
        toast.success(`Bookmark Removed`);
        setBookmark(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const contents = description?.split("\n");
  return (
    <>
      <h1 className="poem-name">{name}
      </h1>
      <h5 className="authorname">by <span className="author-span">{author}</span></h5>
      <div className="content-features">
        <div onClick={(e) => { AddBookmark(e) }}>
          {
            bookmark ? <BsFillBookmarkCheckFill /> : <BsBookmarkCheck />
          }
        </div>
        <div className="like-btn" onClick={(e) => { Givelike(e) }}>{
          like ? <AiFillLike /> : <AiOutlineLike />
        }</div>
      </div>
      <div className="single-content">
        <div className="content">
          <div className="content-lines">

            {contents?.map((ele, i) => {
              return <div className="lines" key={i}>{ele}</div>;
            })}
          </div>
        </div>
      </div>

    </>
  );
}

export default SinglePoemContent;
