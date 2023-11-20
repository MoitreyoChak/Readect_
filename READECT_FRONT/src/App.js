import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contents from "./pages/Contents";
import SinglePoem from "./pages/SinglePoem";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UpdatePoemContent from "./components/UpdatePoemContent";
import Upload from "./pages/Upload";
import ProfilePage from "./pages/ProfilePage";
import { useProfileContext } from "./context/ProfileContext";
import { Toaster } from "react-hot-toast";
import Navs from "./components/HomePage/Navs";
import ReadLate from "./pages/ReadLate";
import OtherProfile from "./components/Profile/OtherProfile";
import axios from "axios";

const LoggedCheckAPI = "/api/v1/reader/ifLoggedIn";
const MyProfileApi = "/api/v1/reader/";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const { checkLogin, loggedInStatus, getMyProfile } = useProfileContext();

  useEffect(() => {
    const check = checkLogin(LoggedCheckAPI);
    if (check) {
      getMyProfile(MyProfileApi);
    }
  }, [loggedInStatus]);
  return (
    <BrowserRouter>
      <Toaster />
      <Navs />
      <Routes>
        {loggedInStatus ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/type/:contents" element={<Contents />} />
            <Route path="/single/:type/:id" element={<SinglePoem />} />
            <Route path="/upload" element={<Upload />} />
            <Route
              path="/updatePoem/:fieldName/:poemId"
              element={<UpdatePoemContent />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/library" element={<ReadLate />} />
            <Route path="/otherprofile/:id" element={<OtherProfile />} />
            <Route path="*" element={<>Error</>} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/type/:contents" element={<Contents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<Login />} />
          </>
        )}

        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
