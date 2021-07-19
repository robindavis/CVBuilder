// User Imports
import { UPDATE_USER_LOGIN_STATUS } from "./UserLoginStatusActionType";
export const updateUserLoginStatus = (newStatus) => ({
  type: UPDATE_USER_LOGIN_STATUS,
  payload: newStatus,
});
