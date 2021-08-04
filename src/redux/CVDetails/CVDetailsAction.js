// User Imports
import * as actionTypes from "./CVDetailsActionType";

export const updateCVDetails = (newCVDetails) => ({
  type: actionTypes.UPDATE_CV_DETAILS,
  payload: newCVDetails,
});

export const updateServerCVDetails = (newServerCVDetails) => ({
  type: actionTypes.SAVE_SERVER_CV_DETAILS,
  payload: newServerCVDetails,
});
