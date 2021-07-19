// Library Imports
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// User Imports
import "./HomePage.scss";
import { windowHeight } from "../../utils/Dimensions/Dimensions";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { firebaseSignout } from "../../firebase/init";
import GithubIcon from "../../resources/HomePage/GithubIcon.png";
import SlideImage1 from "../../resources/HomePage/SlideImage1.jpg";
import SlideImage2 from "../../resources/HomePage/SlideImage2.jpg";
import SlideImage3 from "../../resources/HomePage/SlideImage3.jpg";

function HomePage(props) {
  // Login Signup Modal Flag
  const [loginSignupModalStatus, setLoginSignupModalStatus] = useState(false);
  const history = useHistory();

  // TODO
  // For Font size override in mobile
  const fontSizeOverrideBasedOnHeight =
    /*windowHeight < 568 ? "sectionParagraphFontOverride" :*/ "";

  const GithubLabel = () => {
    return (
      <div className="githubLabelContainer">
        <div className="githubLabelBackground">
          <div title="Github">
            <a href="https://github.com/robindavis/Resume" target="_blank">
              <img src={GithubIcon} className="githubIcon" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Contact Link
  const ContactLink = () => {
    return (
      <div className="contactLinkContainer">
        <Link to="/Contact">Contact</Link>
      </div>
    );
  };

  // User Signout Callback
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
  // Contact Link
  const SignoutLink = () => {
    return (
      <div className="signoutLinkContainer">
        <div onClick={handleUserSignout}>Signout</div>
      </div>
    );
  };

  // Handle Create CV Button Click
  const handleCreateCVButtonClick = () => {
    if (props.isUserLoggedIn) {
      console.log("User is already logged in");
      // User is already logged in
      history.push("/CVBuilderPage");
    } else {
      console.log("User is not logged in");
      // User is not logged in
      setLoginSignupModalStatus(true);
    }
  };

  const handleLoggedInSuccess = () => {
    setLoginSignupModalStatus(false);
    history.push("/CVBuilderPage");
  };

  return (
    <div className="homePageContainer">
      <div className="homePagePanel1" style={{ height: windowHeight }}>
        <GithubLabel />
        {props.isUserLoggedIn && <SignoutLink />}
        <ContactLink />
        <div className="pageSectionPanel">
          <div className="sectionHeader">Welcome to CV Builder</div>
          <div className={`sectionParagraph ${fontSizeOverrideBasedOnHeight}`}>
            CVs are used to make a favorable impression on a prospective
            employer. Your CV is often the first impression a potential employer
            has of you. For this reason, it is often referred to as one of the
            most crucial steps taken during a job search.
          </div>
          <div className={`sectionParagraph ${fontSizeOverrideBasedOnHeight}`}>
            An electronic CV is a plain text (ASCII), PDF or HTML document that
            provides an employer with information regarding a job candidate's
            professional experience, education and job qualifications and is
            meant to be read by a computer program instead of by a human being.
          </div>
          <div className="sectionButtons">
            <Button
              size="large"
              className="buttonOverride"
              color="primary"
              onClick={handleCreateCVButtonClick}
            >
              Create CV
            </Button>
          </div>
        </div>
      </div>
      <div className="homePagePanel2" style={{ height: windowHeight }}>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          width="70%"
          showThumbs={false}
          interval={2500}
          showStatus={false}
          className="carouselContainer"
        >
          <img
            src={SlideImage1}
            style={{ height: windowHeight * 0.9 }}
            className="slideContainer"
          />
          <img
            src={SlideImage2}
            style={{ height: windowHeight * 0.9 }}
            className="slideContainer"
          />
          <img
            src={SlideImage3}
            style={{ height: windowHeight * 0.9 }}
            className="slideContainer"
          />
        </Carousel>
      </div>
      <div className="homePagePanel3" style={{ height: windowHeight }}>
        <div className="pageSectionPanel">
          <div className="sectionHeader">Features:</div>
          <div className={`sectionParagraph ${fontSizeOverrideBasedOnHeight}`}>
            <ul>
              <li>CV format can be easily changed</li>
              <li>CV fields can be edited and changed easily</li>
              <li>
                For new formats being released, existing CV fields info can be
                used
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="homePagePanel4">
        <div className="footerParagraphMessage">
          Site Developed By: <i>Robin Davis</i>
        </div>
        <div className="footerParagraphMessage linkText">
          <Link to="/Contact">Contact Developer</Link>
        </div>
        <div title="Github">
          <a href="https://github.com/robindavis/Resume" target="_blank">
            <img src={GithubIcon} className="githubFooterIcon" />
          </a>
        </div>
      </div>
      {loginSignupModalStatus && (
        <LoginSignupModal
          setLoginSignupModalStatus={setLoginSignupModalStatus}
          handleLoggedInSuccess={handleLoggedInSuccess}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.UserLoginStatusReducer.isUserLoggedIn,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
