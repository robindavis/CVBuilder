// User Imports
import { UPDATE_USER_LOGIN_STATUS } from "./UserLoginStatusActionType";

const initialState = {
  isUserLoggedIn: false,
};

const UserLoginStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_LOGIN_STATUS: {
      return Object.assign({}, state, { isUserLoggedIn: action.payload });
    }
    default: {
      return state;
    }
  }
};

export default UserLoginStatusReducer;
