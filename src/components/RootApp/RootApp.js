// Library Imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// User Imports
import "./RootApp.scss";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import LoaderImage from "../../resources/LoginSignupPage/LoaderImage.jpg";
import HomePage from "../HomePage/HomePage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ContactPage from "../ContactPage/ContactPage";
import CVBuilderPage from "../CVBuilderPage/CVBuilderPage";
import Template1 from "../CVTemplate/Template1";
import {
  firebaseInit,
  firebaseCheckIfAlreadyLoggedIn,
} from "../../firebase/init";

function RootApp(props) {
  // Global Variables
  const notificationCloseObj = {
    isOpen: false,
    severity: "success",
    message: "",
  };

  useEffect(() => {
    props.setGlobalOverlayStatus(true);
    firebaseInit();
    firebaseCheckIfAlreadyLoggedIn()
      .then(() => {
        props.setGlobalOverlayStatus(false);
        props.setUserLoginStatus(true);
      })
      .catch(() => {
        props.setGlobalOverlayStatus(false);
        props.setUserLoginStatus(false);
      });
  }, []);

  return (
    <div className="rootAppContainer">
      {props.isOverlayVisible && (
        <div className="universalOverlayContainer">
          <img src={LoaderImage} />
        </div>
      )}
      {props.isNotificationVisible && (
        <Snackbar
          open={props.isNotificationVisible}
          autoHideDuration={3000}
          onClose={() =>
            props.setGlobalNotificationStatus(notificationCloseObj)
          }
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() =>
              props.setGlobalNotificationStatus(notificationCloseObj)
            }
            severity={props.notificationSeverity}
          >
            {props.notificationMessage}
          </MuiAlert>
        </Snackbar>
      )}
      <Router>
        <Switch>
          {/* Start */}
          {/* <Route path="/" exact>
            <CVBuilderPage />
          </Route> */}
          {/* End */}
          <Route path="/Contact" exact>
            <ContactPage />
          </Route>
          <Route path="/Template1" exact>
            {props.isUserLoggedIn ? <Template1 /> : <Redirect to="/" />}
          </Route>
          <Route path="/CVBuilderPage" exact>
            {props.isUserLoggedIn ? <CVBuilderPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.UserLoginStatusReducer.isUserLoggedIn,
  isOverlayVisible: state.GlobalOperationReducer.isOverlayVisible,
  isNotificationVisible: state.GlobalOperationReducer.notificationInfo.isOpen,
  notificationSeverity: state.GlobalOperationReducer.notificationInfo.severity,
  notificationMessage: state.GlobalOperationReducer.notificationInfo.message,
});

const mapDispatchToProps = (dispatch) => ({
  setGlobalNotificationStatus: (newNotificationInfo) => {
    dispatch(updateGlobalOperationNotificationStatus(newNotificationInfo));
  },
  setUserLoginStatus: (newStatus) => {
    dispatch(updateUserLoginStatus(newStatus));
  },
  setGlobalOverlayStatus: (newStatus) => {
    dispatch(updateGlobalOperationOverlayStatus(newStatus));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootApp);
