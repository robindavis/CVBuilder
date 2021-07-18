// Library Imports
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// User Imports
import "./HomePage.scss";
import { windowHeight } from "../../utils/Dimensions/Dimensions";
import LoginSignupModal from "../LoginSignupModal/LoginSignupModal";
import GithubIcon from "../../resources/HomePage/GithubIcon.png";
import SlideImage1 from "../../resources/HomePage/SlideImage1.jpg";
import SlideImage2 from "../../resources/HomePage/SlideImage2.jpg";
import SlideImage3 from "../../resources/HomePage/SlideImage3.jpg";

function HomePage() {
  // Login Signup Modal Flag
  const [loginSignupModalStatus, setLoginSignupModalStatus] = useState(false);

  // TODO
  // For Font size override in mobile
  const fontSizeOverrideBasedOnHeight =
    /*windowHeight < 568 ? "sectionParagraphFontOverride" :*/ "";

  const GithubLabel = () => {
    return (
      <div className="githubLabelContainer">
        <div className="githubLabelBackground">
          <Tooltip title="Github">
            <a href="https://github.com/robindavis/Resume" target="_blank">
              <img src={GithubIcon} className="githubIcon" />
            </a>
          </Tooltip>
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

  return (
    <div className="homePageContainer">
      <div className="homePagePanel1" style={{ height: windowHeight }}>
        <GithubLabel />
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
              onClick={() => setLoginSignupModalStatus(!loginSignupModalStatus)}
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
        <Tooltip title="Github">
          <a href="https://github.com/robindavis/Resume" target="_blank">
            <img src={GithubIcon} className="githubFooterIcon" />
          </a>
        </Tooltip>
      </div>
      {loginSignupModalStatus && (
        <LoginSignupModal
          setLoginSignupModalStatus={setLoginSignupModalStatus}
        />
      )}
    </div>
  );
}

export default HomePage;
