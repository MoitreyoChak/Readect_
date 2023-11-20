// import { act } from "react-dom/test-utils";

const AppReducer = (state, action) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "MY_ALL_POEMS") {
    // const tagPoems = action.payload.filter((ele) => {
    //     return 1;
    // })
    // const searchPoems = tagPoems.filter((ele) => {
    //     const name = ele.category;
    //     return name.includes(action.searchBox);
    // })

    // if (action.rating) {
    //     searchPoems.sort((a, b) => {
    //         return a.price - b.price;
    //     })
    // }
    // console.log(searchPoems);
    return {
      ...state,
      isLoading: false,
      allContents: action.payload,
    };
  }

  //Search Contents

  //Get All Contents
  else if (action.type === "GET_CONTENTS") {
    // console.log("ada");
    return {
      ...state,
      isLoading: false,
      allContents: action.payload,
    };
  } else if (action.type === "GET_SEARCH") {
    console.log(action.payload);
    return {
      ...state,
      isLoading: false,
      searchContent: action.payload,
    };
  }
  // } else if (action.type === "API_ERROR") {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isError: true,
  //   };
  // } else if (action.type === "SET_SINGLE_LOADING") {
  //   return {
  //     ...state,
  //     isSingleLoading: true,
  //   };
  // } else if (action.type === "MY_SINGLE_POEM") {
  //   return {
  //     ...state,
  //     isSingleLoading: false,
  //     singlePoem: action.payload,
  //   };
  // } else if (action.type === "SINGLE_API_ERROR") {
  //   return {
  //     ...state,
  //     isSingleLoading: false,
  //     isError: true,
  //   };
  // }

  // //PROFILE
  // if (action.type === "SET_PROFILE_LOADING") {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // } else if (action.type === "MY_PROFILE") {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isLogin: true,
  //     profile: action.payload,
  //   };
  // } else if (action.type === "PROFILE_ERROR") {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isLogin: false,
  //     isError: true,
  //   };
  // }

  // //COMMENTS
  // else if (action.type === "SET_COMMENTS_LOADING") {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // } else if (action.type === "POEM_COMMENTS") {
  //   let comments = action.payload.reverse();
  //   let updatedComments = comments;
  //   if (action.num && action.num < comments.length) {
  //     updatedComments = comments.splice(0, action.num);
  //   }
  //   return {
  //     ...state,
  //     isLoading: false,
  //     comments: updatedComments,
  //   };
  // } else if (action.type === "COMMENTS_ERROR") {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     isError: true,
  //   };
  // }

  // //User ID
  // else if (action.type === "USER_ID") {
  //   return {
  //     ...state,
  //     userId: action.payload,
  //   };
  // } else {
  //   return state;

};

// const tagCompare = (a = [], b = []) => {
//   let result = true;
//   a.forEach((ele) => {
//     result = b.includes(ele);
//   });
//   return result;
// };

export default AppReducer;
