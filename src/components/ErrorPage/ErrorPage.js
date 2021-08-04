// Library Imports
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

// User Imports
import "./ErrorPage.scss";
import { windowHeight } from "../../utils/Dimensions/Dimensions";

function ErrorPage() {
  // Global Variables
  const history = useHistory();

  // Callback for the home button click
  const handleHomeButtonClick = (event) => {
    event.stopPropagation();
    history.push("/");
  };

  return (
    <div className="erroPageContainer" style={{ height: windowHeight }}>
      <div className="errorMessageIcon">
        <SentimentVeryDissatisfiedIcon />
      </div>
      <div className="errorMessage boldText">404</div>
      <div className="errorMessage">Page not found</div>
      <div className="errorMessage">
        Sorry, the page you are looking for does not exist.
      </div>
      <div className="errorMessage">
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleHomeButtonClick}
        >
          <HomeIcon /> Return Home
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
