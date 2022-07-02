let initialState = {
  userDetails: {},
  hasLoggedIn: false,
  isLoading: false,
  hasError: false,
  showSignupForm: false,
};

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userDetails: action.data,
        hasLoggedIn: true,
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        isLoading: false,
        hasError: action.data,
        userDetails: null,
      };

    case "LOG_OUT_REQUEST":
      return {
        ...state,
        userDetails: null,
        hasLoggedIn: false,
      };

    case "SIGN_UP_REQUEST":
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        hasError: false,
        userDetails: action.data,
        hasLoggedIn: true,
      };

    case "SIGN_UP_FAILED":
      return {
        ...state,
        isLoading: false,
        hasError: action.data,
        userDetails: null,
      };

    case "OPEN_SIGN_UP_FORM":
      return {
        ...state,
        showSignupForm: true,
      };
    case "CLOSE_SIGN_UP_FORM":
      return {
        ...state,
        showSignupForm: false,
        hasError: false,
      };
    default:
      return state;
  }
};
