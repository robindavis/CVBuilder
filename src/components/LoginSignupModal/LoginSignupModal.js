// Library Imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";

// User Imports
import { firebaseLogin, firebaseSignup } from "../../firebase/init";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import "./LoginSignupModal.scss";

function LoginSignupModal(props) {
  // Tab State
  const [tabCurrentIndex, setTabCurrentIndex] = useState(0);

  // Tab Change Event Callback
  const handleTabChange = (event, newValue) => {
    setTabCurrentIndex(newValue);
  };

  // Modal Overaly Click Event
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    props.setLoginSignupModalStatus(false);
  };

  // Cross Icon Click Callback
  const handleCrossIconClick = (e) => {
    handleOverlayClick(e);
  };

  // New Account Creation Callback
  const handleNewAccountCreation = (e) => {
    e.preventDefault();
    setTabCurrentIndex(1);
    handleAlertClose();
  };

  // Alert Message Close Callback
  const handleAlertClose = () => {
    props.setGlobalNotificationStatus({
      isOpen: false,
      severity: "success",
      message: "",
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

  // Login Button Callback
  const handleUserLogin = (userEmail, userPass) => {
    props.setGlobalOverlayStatus(true);
    firebaseLogin(userEmail, userPass)
      .then((userCredential) => {
        props.setUserLoginStatus(true);
        props.setGlobalOverlayStatus(false);
        console.log(userCredential);
        handleAlertOpen("success", "Logged in Successfully!!");
        props.handleLoggedInSuccess();
      })
      .catch((error) => {
        props.setGlobalOverlayStatus(false);
        console.log(error);
        handleAlertOpen("error", error.message);
      });
  };

  // Signup Button Callback
  const handleUserSignup = (userEmail, userPass) => {
    props.setGlobalOverlayStatus(true);
    firebaseSignup(userEmail, userPass)
      .then((userCredential) => {
        props.setUserLoginStatus(true);
        props.setGlobalOverlayStatus(false);
        console.log(userCredential);
        handleAlertOpen("success", "Logged in Successfully!!");
        props.handleLoggedInSuccess();
      })
      .catch((error) => {
        props.setGlobalOverlayStatus(false);
        console.log(error);
        handleAlertOpen("error", error.message);
      });
  };

  // Login Page Component
  const LoginPage = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    return (
      <div className="loginPageContainer">
        <TextField
          fullWidth
          label="Email"
          type="text"
          margin="normal"
          value={userEmail}
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={userPass}
          onChange={(event) => {
            setUserPass(event.target.value);
          }}
        />
        <div className="actionContainer">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUserLogin(userEmail, userPass)}
          >
            Login
          </Button>
        </div>
        <div className="actionContainer">
          <Link href="#" onClick={handleNewAccountCreation}>
            Create account
          </Link>
        </div>
      </div>
    );
  };

  // Sign Up Page Component
  const SignupPage = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    return (
      <div className="signupPageContainer">
        <TextField
          fullWidth
          label="Email ID"
          margin="normal"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
        />
        <div className="actionContainer">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUserSignup(userEmail, userPass)}
          >
            Signup
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="loginSignupModalOveraly"></div>
      <div className="loginSignupModalWrapper" onClick={handleOverlayClick}>
        <div
          className="loginSignupModalContainer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CancelIcon className="crossIcon" onClick={handleCrossIconClick} />
          <div className="loginSignupModal">
            <Tabs
              value={tabCurrentIndex}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            {tabCurrentIndex === 0 && <LoginPage />}
            {tabCurrentIndex === 1 && <SignupPage />}
          </div>
        </div>
      </div>
    </>
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

export default connect(null, mapDispatchToProps)(LoginSignupModal);
