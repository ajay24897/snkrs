let initialState = {
  totalItems: 0,
};

export const cartDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDED_IN_CART":
      return {
        ...state,
        totalItems: state.totalItems + 1,
      };

    case "REMOVED_FROM_CART":
      return {
        ...state,
        totalItems: state.totalItems - 1,
      };

    case "INITIAL_CART_ITEM":
      console.log(" action.data", action.data);
      return {
        ...state,
        totalItems: action.data?.length,
      };
    case "CLEAR_CART_ITEM":
      console.log(" action.data", action.data);
      return {
        ...state,
        totalItems: 0,
      };

    default:
      return state;
  }
};
