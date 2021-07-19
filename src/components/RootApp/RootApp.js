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
import LoaderImage from "../../resources/LoginSignupPage/LoaderImage.jpg";
import HomePage from "../HomePage/HomePage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ContactPage from "../ContactPage/ContactPage";
import CVBuilderPage from "../CVBuilderPage/CVBuilderPage";
import { firebaseInit } from "../../firebase/init";

function RootApp(props) {
  // Global Variables
  const notificationCloseObj = {
    isOpen: false,
    severity: "success",
    message: "",
  };

  useEffect(() => {
    firebaseInit();
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
          <Route path="/Contact" exact>
            <ContactPage />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RootApp);
