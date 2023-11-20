import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/ProfileReducer";
import axios from "axios";

const ProfileContext = createContext();

const initialState = {
  isProfileLoading: false,
  isError: false,
  loggedInStatus: false,
  profile: {},
  followData: [],
  myPoems: [],
  myArticles: [],
  myShortStories: [],
  myBooks: [],
  readLater: [],
};

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //login using axios
  const login = async (url, body) => {
    try {
      await axios.post(url, body);
      dispatch({ type: "LOGIN_SUCCESS" });
      return false;
    } catch (error) {
      console.log(error);
      dispatch({ type: "API_ERROR", payload: error });
      return error.response.data.message;
    }
  };

  //Registration using axios
  const register = async (url, body) => {
    try {
      await axios.post(url, body);
      dispatch({ type: "LOGIN_SUCCESS" });
      return false;
    } catch (err) {
      dispatch({ type: "API_ERROR", payload: err });
      return err.response.data.message;
    }
  };

  //Check if logged in
  const checkLogin = async (url) => {
    try {
      const resp = await axios.get(url);
      if (resp.data.status === "Success") {
        dispatch({ type: "LOGGED_IN" });
        return true;
      } else {
        dispatch({ type: "LOGGED_OUT" });
        return false;
      }
    } catch (error) {
      dispatch({ type: "LOGGED_OUT" });
      return false;
    }
  };

  //logout
  const logout = async (url) => {
    try {
      const resp = await axios.post(url);
      dispatch({ type: "LOGGED_OUT" });
    } catch (err) {
      dispatch({ type: "API_ERROR", payload: err });
    }
  };

  //Get My Profile With Axios
  const getMyProfile = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const resp = await axios.get(url);
      dispatch({ type: "MY_PROFILE", payload: resp.data.data });
      return true;
    } catch (err) {
      dispatch({ type: "API_ERROR", payload: err });
    }
  };

  //Get Follow Data
  const getFollowData = async (url) => {
    try {
      const resp = await axios.get(url);
      dispatch({ type: "MY_FOLLOW_DATA", payload: resp.data.data });
      return true;
    } catch (error) {
      dispatch({ type: "API_ERROR", payload: error });
      return false;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        login,
        register,
        checkLogin,
        logout,
        getMyProfile,
        getFollowData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

//custom hooks
const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, ProfileContext, useProfileContext };
