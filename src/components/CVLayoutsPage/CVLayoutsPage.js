// Library Imports
import { Link } from "react-router-dom";

// User Imports
import "./CVLayoutsPage.scss";

function CVLayoutsPage(props) {
  return (
    <div
      className={
        props.shouldHideThisTab
          ? "hideThisTab cvLayoutsPageContainer"
          : "cvLayoutsPageContainer"
      }
    >
      <Link to="/Template1">
        <div className="cardContainer">Template 1</div>
      </Link>
    </div>
  );
}

export default CVLayoutsPage;
