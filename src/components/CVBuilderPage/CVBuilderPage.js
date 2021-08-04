// Library Imports
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// User Imports
import { firebaseSignout } from "../../firebase/init";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import {
  updateServerCVDetails,
  updateCVDetails,
} from "../../redux/CVDetails/CVDetailsAction";
import CVDetailsPage from "../CVDetailsPage/CVDetailsPage";
import CVLayoutsPage from "../CVLayoutsPage/CVLayoutsPage";
import { saveUserCVInfo } from "../../firebase/init";
import "./CVBuilderPage.scss";

function CVBuilderPage(props) {
  // Global Variables
  const history = useHistory();
  const [tabCurrentIndex, setTabCurrentIndex] = useState(0);

  // Mount/Unmount hook
  useEffect(() => {
    let lastSavedTabIndex = localStorage.getItem("SavedCVBuilderPage");
    if (lastSavedTabIndex) {
      setTabCurrentIndex(parseInt(lastSavedTabIndex));
    }
  }, []);

  // Tab Change Event Callback
  const handleTabChange = (event, newValue) => {
    setTabCurrentIndex(newValue);
    localStorage.setItem("SavedCVBuilderPage", newValue);
    // Checking if there is some changed values as compared between redux store vs firebase database
    // if (
    //   JSON.stringify(props.cvDetails) !== JSON.stringify(props.serverCVDetails)
    // ) {
    //   props.setServerCVDetails(props.cvDetails);
    //   saveUserData(props.cvDetails);
    // }
  };

  // Utility function for saving the user data
  const saveUserData = (data) => {
    props.setGlobalOverlayStatus(true);
    saveUserCVInfo(data)
      .then(() => {
        props.setGlobalOverlayStatus(false);
        handleAlertOpen("success", "Data saved successfully!");
      })
      .catch((error) => {
        props.setGlobalOverlayStatus(false);
        handleAlertOpen("error", `Data save failed! ${error}`);
      });
  };

  // Alert Message Open Callback
  const handleAlertOpen = (severity, message) => {
    props.setGlobalNotificationStatus({
      isOpen: true,
      severity: severity,
      message: message,
    });
  };

  // Signout Click Callback
  const handleUserSignout = (event) => {
    event.stopPropagation();
    props.setGlobalOverlayStatus(true);
    firebaseSignout()
      .then(() => {
        props.setGlobalNotificationStatus({
          isOpen: true,
          severity: "success",
          message: "Logged out Successfully!!",
        });
        props.setGlobalOverlayStatus(false);
        props.setUserLoginStatus(false);
        history.push("/");
        props.setCVDetails([]);
        props.setServerCVDetails([]);
      })
      .catch((error) => {
        props.setGlobalNotificationStatus({
          isOpen: false,
          severity: "error",
          message: error.message,
        });
        props.setGlobalOverlayStatus(false);
        props.setCVDetails([]);
        props.setServerCVDetails([]);
      });
  };

  return (
    <div className="cvBuilderPageContainer">
      <div className="headerContainer">
        <Link to="/">
          <KeyboardBackspaceIcon className="backButton" />
        </Link>
        <div className="userActionContainer">
          <div className="signoutLinkContainer">
            <div onClick={handleUserSignout}>Signout</div>
          </div>
        </div>
      </div>
      <Tabs
        value={tabCurrentIndex}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="CV Details" />
        <Tab label="CV Layouts" />
      </Tabs>
      {/* {tabCurrentIndex === 0 && <CVDetailsPage />}
      {tabCurrentIndex === 1 && <CVLayoutsPage />} */}
      <CVDetailsPage shouldHideThisTab={tabCurrentIndex !== 0} />
      <CVLayoutsPage shouldHideThisTab={tabCurrentIndex !== 1} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  cvDetails: state.CVDetailsReducer.cvDetails,
  serverCVDetails: state.CVDetailsReducer.serverCVDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLoginStatus: (newStatus) => {
    dispatch(updateUserLoginStatus(newStatus));
  },
  setGlobalOverlayStatus: (newStatus) => {
    dispatch(updateGlobalOperationOverlayStatus(newStatus));
  },
  setGlobalNotificationStatus: (newNotificationInfo) => {
    dispatch(updateGlobalOperationNotificationStatus(newNotificationInfo));
  },
  setServerCVDetails: (newServerCVDetails) => {
    dispatch(updateServerCVDetails(newServerCVDetails));
  },
  setCVDetails: (newCVDetails) => {
    dispatch(updateCVDetails(newCVDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CVBuilderPage);
