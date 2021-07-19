// User Imports
import * as actionType from "./GlobalOperationActionType";

const initialState = {
  isOverlayVisible: false,
  notificationInfo: {
    isOpen: false,
    severity: "success",
    message: "",
  },
};

const globalOperationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_GLOBAL_OPERATION_OVERLAY_STATUS: {
      return Object.assign({}, state, {
        isOverlayVisible: action.payload,
      });
    }
    case actionType.UPDATE_GLOBAL_OPERATION_NOTIFICATION_STATUS: {
      return Object.assign({}, state, { notificationInfo: action.payload });
    }
    default: {
      return state;
    }
  }
};

export default globalOperationStatusReducer;
