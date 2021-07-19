// User Imports
import * as actionType from "./GlobalOperationActionType";

export const updateGlobalOperationOverlayStatus = (newStatus) => ({
  type: actionType.UPDATE_GLOBAL_OPERATION_OVERLAY_STATUS,
  payload: newStatus,
});

export const updateGlobalOperationNotificationStatus = (notificationInfo) => ({
  type: actionType.UPDATE_GLOBAL_OPERATION_NOTIFICATION_STATUS,
  payload: notificationInfo,
});
