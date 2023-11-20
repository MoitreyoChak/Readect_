import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleContext } from "../context/SingleContext";
import SinglePoemImage from "../components/SingleContent/SinglePoemImage";
import SinglePoemContent from "../components/SingleContent/SinglePoemContent";
import PoemComment from "../components/SingleContent/PoemComment";
import Loading from "../components/Loading";
import Pagination from "../components/SingleContent/Pagination";
import "../style/SinglePoem.css";
import Follow from "./Follow";
import { useProfileContext } from "../context/ProfileContext";

const GetSingleContentAPI = "/api/v1/reader";
const MyProfileApi = "/api/v1/reader/";
// 64bdf4d6b2ef96b661ff83e1

function SinglePoem() {
  const { type, id } = useParams();
  const { getSinglePoem, isLoading, content = {} } = useSingleContext();
  const { getMyProfile, isProfileLoading } = useProfileContext();

  useEffect(() => {
    getMyProfile(MyProfileApi);
    getSinglePoem(`${GetSingleContentAPI}/${type}/single/${id}`);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row single-poem-area">
          <Pagination name={content.title} type={type} />
          <div className="col-md-12 col-12 poem-area">
            {isLoading || isProfileLoading ? (
              <div className="row">
                <div className="col-md-4 col-10 mx-auto">
                  <Loading />
                </div>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-8 col-12">
                    <SinglePoemImage />
                    <SinglePoemContent
                      name={content.title}
                      description={content.content}
                      author={content.name}
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <Follow />
                    <PoemComment id={content._id} content={content?.comments} type={type} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePoem;
