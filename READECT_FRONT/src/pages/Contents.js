import React, { useEffect, useState } from "react";
import SingleUnit from "../components/SingleUnit";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import Card from "react-bootstrap/Card";
import SearchBox from "../components/SearchBox";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../style/Contents.css";
import axios from "axios";
import { TbMoodSad } from "react-icons/tb";

const APIThapa = "https://api.pujakaitem.com/api/products";

const ContentsAPI = "/api/v1/reader";
const Search = "/api/v1/reader/poem/search";

let type = "";

const tags = [];

const Contents = () => {
  const navigate = useNavigate();
  const { contents } = useParams();
  const {
    isLoading,
    allContents = [],
    searchContent = [],
    getAllContents,
    getSearchContents,
  } = useAppContext();
  const [search, setSearch] = useState("");

  if (contents === "poems") {
    type = "poem";
  } else if (contents === "articles") {
    type = "article";
  } else if (contents === "books") {
    type = "book";
  } else if (contents === "shortstories") {
    type = "shortstory";
  }

  const searchFunc = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    async function makeSearch() {
      const controller = new AbortController();
      try {
        if (search) {
          const resp = await axios.get(
            `${ContentsAPI}/${type}/search/${search}`,
            {
              signal: controller.signal,
            }
          );
          console.log(resp.data.data);
          getSearchContents(resp.data.data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          getSearchContents("error");
        }
      }
      return function () {
        controller.abort();
      };
    }
    makeSearch();
    // console.log(searchContent);
  }, [search]);

  useEffect(() => {
    getAllContents(`${ContentsAPI}/${type}`);
  }, []);
  return (
    <>
      <div className="container-fluid all-contents-area">
        <div className="row">
          <div className="col-md-6 col-10 text-center mx-auto">
            <h1 className="display-2 text-uppercase mt-4 contents-title">{contents}</h1>
            <SearchBox searchBox={search} searchFunc={searchFunc} />
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-10 col-11 mx-auto all-contents">
              {search
                ? searchContent.length === 0 ? <div className="no-result">No Results <TbMoodSad /></div> : <>
                  {
                    searchContent?.map((ele, i) => {
                      return <SingleUnit key={i} content={ele} type={type} />;
                    })
                  }
                </>
                : allContents?.map((ele, i) => {
                  return <SingleUnit key={i} content={ele} type={type} />;
                })
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contents;
