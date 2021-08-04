// User Imports
import * as actionTypes from "./CVDetailsActionType";

const initialState = {
  cvDetails: [],
  serverCVDetails: [],
};

const CVDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CV_DETAILS: {
      return Object.assign({}, state, { cvDetails: action.payload });
    }
    case actionTypes.SAVE_SERVER_CV_DETAILS: {
      return Object.assign({}, state, { serverCVDetails: action.payload });
    }
    default: {
      return state;
    }
  }
};

export default CVDetailsReducer;
