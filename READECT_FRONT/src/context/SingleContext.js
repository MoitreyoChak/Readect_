import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/SingleReducer";
import axios from "axios";

const SingleContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  content: {},
  comments: [],
};

const SingleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getSinglePoem = async (url) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const resp = await axios.get(url);
      //   console.log(resp.data.data);
      dispatch({ type: "GET_CONTENTS", payload: resp.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING_FALSE" });
    }
  };

  //   const getPoemComments = async (url, num) => {
  //     try {
  //       // dispatch({ type: "SET_LOADING" });
  //       const resp = await axios.get(url);
  //       // console.log(resp.data.data[0].comments);
  //       dispatch({
  //         type: "GET_COMMENTS",
  //         commentsPayload: resp.data.data[0].comments,
  //       });
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       //dispatch({ type: "SET_LOADING_FALSE" });
  //     }
  //   };

  return (
    <SingleContext.Provider value={{ ...state, getSinglePoem }}>
      {children}
    </SingleContext.Provider>
  );
};

const useSingleContext = () => {
  return useContext(SingleContext);
};

export { SingleProvider, SingleContext, useSingleContext };
