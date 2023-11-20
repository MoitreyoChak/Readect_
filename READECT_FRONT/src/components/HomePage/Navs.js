import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

//React icons
import { VscAccount } from "react-icons/vsc";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { IoAddCircleSharp, IoAddCircleOutline } from "react-icons/io5";


import { useProfileContext } from "../../context/ProfileContext";
import { BsBookmarkCheck, BsChatDots, BsChatDotsFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import { BiMoon, BiSolidMoon } from "react-icons/bi";

// const LogoutAPI = "/api/v1/reader/logout";
// const LoggedCheckAPI = "/api/v1/reader/ifLoggedIn";

const Navs = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState(0);

  //Detect active page
  const setting = () => {
    switch (location.pathname) {
      case '/':
        setActive(0);
        break;
      case '/profile/library':
        setActive(1)
        break;
      case '/upload':
        setActive(2);
        break;
      case '/aboutus':
        setActive(3);
        break;
      case '/profile':
        setActive(4);
        break;
      default:
        setActive(5);
        break;
    }
  }

  useEffect(() => {
    setting();
  }, [location]);

  const ChangeTheme = () => {
    const doc = document.getElementById("root");
    if (theme === 0) {
      doc.className = "light-theme";
      setTheme(1);
    }
    else {
      doc.className = "dark-theme";
      setTheme(0);
    }
  }

  const { loggedInStatus } = useProfileContext();

  return (
    <>
      <div className="nav-mobile-title">
        <div className="text">Readect</div>
        <div className="theme-select" onClick={(e) => { ChangeTheme(e) }}>
          {
            theme ? <BiMoon /> : <BiSolidMoon />
          }
        </div>
      </div>
      {/* For DeskTop  */}
      <div className="navbar">
        <div className="nav-title">
          Readect
        </div>
        <div className="nav-items">
          <div className="theme-select me-2" onClick={(e) => { ChangeTheme(e) }}>
            {
              theme ? <BiMoon /> : <BiSolidMoon />
            }
          </div>
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/profile/library" className="nav-item">Bookmarks</NavLink>
          <NavLink to="/aboutus" className="nav-item">About us</NavLink>
          <NavLink to="/profile" className="nav-item">
            {
              loggedInStatus ?
                <VscAccount className="nav-prof" /> :
                <button className="nav-login-btn">Login</button>
            }
          </NavLink>

        </div>
      </div>

      {/* For Mobile  */}
      <div className="navbar-mobile">
        <NavLink to="/" className="nav-home">
          {
            active === 0 ? <AiFillHome /> : <AiOutlineHome />
          }
        </NavLink>
        <NavLink to="profile/library" className="nav-bookmark">
          {
            active === 1 ? <BsFillBookmarkCheckFill /> : <BsBookmarkCheck />
          }
        </NavLink>
        <NavLink to="/upload" className="nav-upload">
          {
            active === 2 ? <IoAddCircleSharp /> : <IoAddCircleOutline />
          }
        </NavLink>
        <NavLink to="/aboutus" className="nav-chat">
          {
            active === 3 ? <BsChatDotsFill /> : <BsChatDots />
          }
        </NavLink>
        <NavLink to="/profile" className="nav-profile">
          {
            active === 4 ? <RiAccountCircleFill /> : <RiAccountCircleLine />
          }
        </NavLink>
      </div>
    </>
  );
};

export default Navs;
