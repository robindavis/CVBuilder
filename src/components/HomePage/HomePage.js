// Library Imports
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// User Imports
import "./HomePage.scss";
import { windowHeight, windowWidth } from "../../utils/Dimensions/Dimensions";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import {
  updateServerCVDetails,
  updateCVDetails,
} from "../../redux/CVDetails/CVDetailsAction";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import { firebaseSignout } from "../../firebase/init";
import GithubIcon from "../../resources/HomePage/GithubIcon.png";
import SlideImage1 from "../../resources/HomePage/SlideImage1.png";
import SlideImage2 from "../../resources/HomePage/SlideImage2.png";
import SlideImage3 from "../../resources/HomePage/SlideImage3.png";
import MobileSlideImage1 from "../../resources/HomePage/MobileSlideImage1.png";
import MobileSlideImage2 from "../../resources/HomePage/MobileSlideImage2.png";
import MobileSlideImage3 from "../../resources/HomePage/MobileSlideImage3.png";

function HomePage(props) {
  // Login Signup Modal Flag
  const [loginSignupModalStatus, setLoginSignupModalStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("SavedCVBuilderPage");
  }, []);

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
            A curriculum vitae, often abbreviated as CV, is a document that job
            applicants use to showcase their academic and professional
            accomplishments. It is used to apply for positions within areas
            where a person’s specific knowledge or expertise is required. A
            curriculum vitae is usually longer than a resume and must include
            the information that the recruiter needs to verify the skills,
            experience, and educational qualifications of an applicant.
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
      <div
        className="homePagePanel2"
        style={{ height: "430px", margin: "10px 0" }}
      >
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
            src={windowWidth < 650 ? MobileSlideImage1 : SlideImage1}
            className="slideContainer"
            style={{ height: "430px" }}
          />
          <img
            src={windowWidth < 650 ? MobileSlideImage2 : SlideImage2}
            className="slideContainer"
            style={{ height: "430px" }}
          />
          <img
            src={windowWidth < 650 ? MobileSlideImage3 : SlideImage3}
            className="slideContainer"
            style={{ height: "430px" }}
          />
        </Carousel>
      </div>
      <div className="homePagePanel3" style={{ height: windowHeight }}>
        <div className="pageSectionPanel">
          <div className="sectionHeader">Features:</div>
          <div className={`sectionParagraph ${fontSizeOverrideBasedOnHeight}`}>
            <ul>
              <li>
                Enter details once and generate multiple templates based on the
                info entered.
              </li>
              <li>All the information is securely saved on your account.</li>
              <li>Any time any where, you can access and print your CV.</li>
              <li>
                New templates are added, so you will be able to generate a
                modern & stylish CV without changing any of the information
                already saved.
              </li>
              <li>Preview of the CV can be seen, before printing the CV.</li>
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
  setServerCVDetails: (newServerCVDetails) => {
    dispatch(updateServerCVDetails(newServerCVDetails));
  },
  setCVDetails: (newCVDetails) => {
    dispatch(updateCVDetails(newCVDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
