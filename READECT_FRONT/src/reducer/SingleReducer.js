const SingleReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_LOADING_FALSE":
      return {
        ...state,
        isLoading: false,
      };

    case "GET_CONTENTS":
      //console.log(action.action.payload);
      return {
        ...state,
        content: action.payload,
      };

    // case "GET_COMMENTS":
    //   return {
    //     ...state,
    //     comment: action.payload,
    //   };
    default:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};

export default SingleReducer;
