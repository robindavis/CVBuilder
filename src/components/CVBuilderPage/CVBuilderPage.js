// Library Imports
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// User Imports
import { firebaseSignout } from "../../firebase/init";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import CVDetailsPage from "../CVDetailsPage/CVDetailsPage";
import CVLayoutsPage from "../CVLayoutsPage/CVLayoutsPage";
import "./CVBuilderPage.scss";

function CVBuilderPage(props) {
  // Global Variables
  const history = useHistory();
  const [tabCurrentIndex, setTabCurrentIndex] = useState(0);

  // Tab Change Event Callback
  const handleTabChange = (event, newValue) => {
    setTabCurrentIndex(newValue);
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
      })
      .catch((error) => {
        props.setGlobalNotificationStatus({
          isOpen: false,
          severity: "error",
          message: error.message,
        });
        props.setGlobalOverlayStatus(false);
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
      {tabCurrentIndex === 0 && <CVDetailsPage />}
      {tabCurrentIndex === 1 && <CVLayoutsPage />}
    </div>
  );
}

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
});

export default connect(null, mapDispatchToProps)(CVBuilderPage);
