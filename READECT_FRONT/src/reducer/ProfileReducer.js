
const ProfileReducer = (state, action) => {
    //LOGIN REDUCER
    if (action.type === "LOGIN_SUCCESS") {
        return {
            ...state,
            isError: false,
        }
    }

    else if (action.type === "API_ERROR") {
        return {
            ...state,
            isError: true,
            errorMsg: action.payload,
        }
    }


    //CHECK LOGGED IN
    else if (action.type === "LOGGED_IN_LOADER") {
        return {
            ...state,
            loggedInStatus: false,
        }
    }

    else if (action.type === "LOGGED_IN") {
        return {
            ...state,
            loggedInStatus: true,
        }
    }

    //NOT LOGGED IN
    else if (action.type === "LOGGED_OUT") {
        return {
            ...state,
            loggedInStatus: false,
        }
    }

    //LOADER
    else if (action.type === "SET_LOADING") {
        return {
            ...state,
            isProfileLoading: true
        }
    }

    //MY PROFILE
    else if (action.type === "MY_PROFILE") {
        return {
            ...state,
            isProfileLoading: false,
            profile: action.payload,
            myPoems: action.payload.poems,
            myArticles: action.payload.articles,
            myShortStories: action.payload.shortStories,
            myBooks: action.payload.books
        }
    }

    //FOLLOW DATA
    else if (action.type === "MY_FOLLOW_DATA") {
        return {
            ...state,
            followData: action.payload,
        }
    }
}
export default ProfileReducer;