let initialState = {
  userDetails: {},
  hasLoggedIn: false,
  isLoading: false,
  hasError: false,
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
        hasError: true,
        userDetails: null,
      };

    case "LOG_OUT_REQUEST":
      return {
        ...state,
        userDetails: null,
        hasLoggedIn: false,
      };
    default:
      return state;
  }
};
