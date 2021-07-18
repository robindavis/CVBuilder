// Library Imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

// User Imports
import "./LoginSignupModal.scss";

function LoginSignupModal(props) {
  // Tab State
  const [value, setValue] = useState(0);

  // Tab Change Event
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Modal Overaly Click
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    props.setLoginSignupModalStatus(false);
  };

  // Cross Icon Click
  const handleCrossIconClick = (e) => {
    handleOverlayClick(e);
  };

  const handleNewAccountCreation = (e) => {
    e.preventDefault();
    setValue(1);
  };

  // Login Page
  const LoginPage = () => {
    return (
      <div className="loginPageContainer">
        <TextField fullWidth label="Email ID" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <div className="actionContainer">
          <Button variant="contained" color="primary">
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

  // Sign Up Page
  const SignupPage = () => {
    return (
      <div className="signupPageContainer">
        <TextField fullWidth label="Email ID" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <div className="actionContainer">
          <Button variant="contained" color="primary">
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
            <Tabs value={value} onChange={handleTabChange} variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            {value === 0 && <LoginPage />}
            {value === 1 && <SignupPage />}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignupModal;
