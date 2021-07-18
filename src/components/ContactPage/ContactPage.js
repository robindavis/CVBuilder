// Library Imports
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

// User Imports
import DeveloperProfilePic from "../../resources/ContactPage/DeveloperProfilePic.jpg";
import FacebookLogo from "../../resources/ContactPage/FacebookLogo.png";
import FirebaseLogo from "../../resources/ContactPage/FirebaseLogo.png";
import GithubBlackLogo from "../../resources/ContactPage/GithubBlackLogo.png";
import GmailLogo from "../../resources/ContactPage/GmailLogo.png";
import LinkedInLogo from "../../resources/ContactPage/LinkedInLogo.png";
import MaterialUILogo from "../../resources/ContactPage/MaterialUILogo.png";
import NPMLogo from "../../resources/ContactPage/NPMLogo.png";
import ReactLogo from "../../resources/ContactPage/ReactLogo.png";
import ReactRouterDOMLogo from "../../resources/ContactPage/ReactRouterDOMLogo.png";
import ReduxLogo from "../../resources/ContactPage/ReduxLogo.png";
import ReduxSagaLogo from "../../resources/ContactPage/ReduxSagaLogo.png";
import TwitterLogo from "../../resources/ContactPage/TwitterLogo.png";
import "./ContactPage.scss";

function ContactPage() {
  // Global Variables
  const startingJobDate = "7 Nov 2017";
  // TODO: Need to update following links
  const githubRepoLink = "https://github.com/robindavis/NewsApp";
  const gmailLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=robin.dvs007@gmail.com";
  const linkedInLink = "https://www.linkedin.com/in/robin-davis-6b4631131";
  const facebookLink = "https://www.facebook.com/robin.davis.5496";
  const twitterLink = "https://twitter.com/RobinDavis007";

  const getExperienceString = (startDate) => {
    let outputString = "";
    let diffInYears = (Date.now() - Date.parse(startDate)) / 31536000000;
    return `${parseInt(diffInYears)} yrs ${parseInt(
      (diffInYears % 1) * 12
    )} months`;
  };

  return (
    <div className="contactPageContainer">
      <div className="backButtonContainer">
        <Link to="/">
          <KeyboardBackspaceIcon className="backButton" />
        </Link>
      </div>
      <div className="developerInfo">
        <div className="developerPicContainer">
          <Avatar src={DeveloperProfilePic} />
        </div>
        <div className="developerDescriptionContainer">
          <strong>Robin Davis (Front-End Developer)</strong>
        </div>
        <div className="developerExperienceContainer">
          <strong>
            Work Experience: {getExperienceString(startingJobDate)}
          </strong>
        </div>
        <div className="technologiesContainer">
          <div className="technologiesHeader">Technologies Used</div>
          <div className="technologiesContent">
            <div className="contentWrapper">
              <img src={ReactLogo} />
              <div className="contentDescription">React</div>
            </div>
            <div className="contentWrapper">
              <img src={ReactRouterDOMLogo} />
              <div className="contentDescription">React Router DOM</div>
            </div>
            <div className="contentWrapper">
              <img src={ReduxLogo} />
              <div className="contentDescription">Redux</div>
            </div>
            <div className="contentWrapper">
              <img src={ReduxSagaLogo} />
              <div className="contentDescription">Redux Saga</div>
            </div>
            <div className="contentWrapper">
              <img src={MaterialUILogo} />
              <div className="contentDescription">Material UI</div>
            </div>
            <div className="contentWrapper">
              <img src={NPMLogo} />
              <div className="contentDescription">NPM</div>
            </div>
            <div className="contentWrapper">
              <img src={FirebaseLogo} />
              <div className="contentDescription">Firebase</div>
            </div>
          </div>
        </div>
        <div className="sourceCodeContainer">
          <div className="sourceCodeHeader">Source Code</div>
          <div className="sourceCodeContent">
            <Tooltip title="Github">
              <div className="contentWrapper">
                <a href={githubRepoLink} target="_blank">
                  <img src={GithubBlackLogo} />
                </a>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="contactMeContainer">
          <div className="sourceCodeHeader">Contact Me</div>
          <div className="sourceCodeContent">
            <Tooltip title="Gmail">
              <div className="contentWrapper">
                <a href={gmailLink} target="_blank">
                  <img src={GmailLogo} />
                </a>
              </div>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <div className="contentWrapper">
                <a href={linkedInLink} target="_blank">
                  <img src={LinkedInLogo} />
                </a>
              </div>
            </Tooltip>
            <Tooltip title="Facebook">
              <div className="contentWrapper">
                <a href={facebookLink} target="_blank">
                  <img src={FacebookLogo} />
                </a>
              </div>
            </Tooltip>
            <Tooltip title="Twitter">
              <div className="contentWrapper">
                <a href={twitterLink} target="_blank">
                  <img src={TwitterLogo} />
                </a>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
