import { GET_USER, LOGOUT_USER } from "./type";

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      state = true;
      return state;

    case LOGOUT_USER:
      state = false;
      return state;

    default: {
      return state;
    }
  }
};
