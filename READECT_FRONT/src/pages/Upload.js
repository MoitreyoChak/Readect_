import React, { useEffect, useState } from "react";
import "../style/Upload.css";
import { toast } from "react-hot-toast";
const url = "/api/v1/reader";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState(0);
  const [select, setSelect] = useState("poem");

  const DisplayType = (e, x) => {
    e.preventDefault();
    const btns = document.querySelectorAll(".show-type-btn");
    btns.forEach(ele => {
      ele.classList.remove("type-active");
    });
    e.target.classList.add("type-active");
    setType(x);
  }

  const selectType = (() => {
    switch (type) {
      case 0:
        setSelect("poem");
        break;
      case 1:
        setSelect("article");
        break;
      case 2:
        setSelect("shortstory");
        break;
      case 3:
        setSelect("book");
        break;
      default:
        break;
    }
  })

  useEffect(() => {
    selectType();
  }, [type])

  const uploadContent = async (e, url) => {
    e.preventDefault();
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
        credentials: "include",
      });
      if (resp) {
        toast.success("Upload Succesful");
        setTitle("");
        setContent("");
      }


    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
      <div className="container-fluid upload-area">
        <div className="row">
          <div className="col-md-5 col-10 mx-auto text-center">
            <h1 className="upload-page-label">Write Your {select}</h1>
            <form className="upload">
              <div className="input-group">
                <input
                  type="text"
                  className="input-group__input"
                  name="title"
                  placeholder="WRITE YOUR TITLE"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group">
                <textarea
                  type="text"
                  placeholder="WRITE YOUR CONTENT"
                  className="input-group__input"
                  name="content"
                  id="content"
                  cols="30"
                  rows="10"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <input
                type="submit"
                className="upload-submit mx-auto"
                value="Submit"
                onClick={(e) => { uploadContent(e, `${url}/${select}`) }}
              />
            </form>
            <form action="" className="cover-image-upload" method="post">
              <label htmlFor="image">Upload Your Cover Image Here</label>
              <input type="file" name="image" id="image" />
              <input type="submit" value="Image Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
