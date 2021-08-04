// Library Imports
import { Link, useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { connect } from "react-redux";
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";

// User Imports
import "./Template1.scss";
import { firebaseSignout } from "../../firebase/init";
import { updateUserLoginStatus } from "../../redux/UserLoginStatus/UserLoginStatusAction";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import {
  updateCVDetails,
  updateServerCVDetails,
} from "../../redux/CVDetails/CVDetailsAction";

const Template1 = (props) => {
  // Global Variables
  const history = useHistory();

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

  const handleOnCVPrint = (event) => {
    event.stopPropagation();
    window.print();
  };

  const TemplateStructure = () => {
    return (
      <div className="template1Wrapper">
        <div className="userName">{props.cvDetails[0].sectionName}</div>
        {props.cvDetails.slice(1).map((sectionInfo, sectionIndex) => (
          <div className="section" key={sectionIndex}>
            <div className="leftSection">
              <div className="sectionName">{sectionInfo.sectionName}</div>
            </div>
            <div className="rightSection">
              {sectionInfo.groups.map((groupInfo, groupIndex) => (
                <div className="group" key={groupIndex}>
                  {groupInfo.map((blockInfo, blockIndex) => {
                    if (blockInfo.blockType === "Sentence") {
                      return (
                        <div className="normalContent" key={blockIndex}>
                          {blockInfo.sentenceValue}
                        </div>
                      );
                    } else if (blockInfo.blockType === "List") {
                      return (
                        <div className="listContent" key={blockIndex}>
                          <ul>
                            {blockInfo.listItems.map(
                              (listItemInfo, listItemIndex) => (
                                <li key={listItemIndex}>{listItemInfo}</li>
                              )
                            )}
                          </ul>
                        </div>
                      );
                    } else if (blockInfo.blockType === "Header") {
                      return (
                        <div className="headerContent" key={blockIndex}>
                          <div className="leftHeader">
                            {blockInfo.leftHeaderValue}
                          </div>
                          <div className="rightHeader">
                            {blockInfo.rightHeaderValue}
                          </div>
                        </div>
                      );
                    } else if (blockInfo.blockType === "Tabular") {
                      return (
                        <div className="tabularContent" key={blockIndex}>
                          <div className="leftTabularContent">
                            {/* <div className="tabularContentTitle"></div> */}
                            <div className="tabularContentText">
                              {blockInfo.leftTabularValue}
                            </div>
                          </div>
                          <div className="rightTabularContent">
                            {/* <div className="tabularContentTitle"></div> */}
                            <div className="tabularContentText">
                              {blockInfo.rightTabularValue}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="template1Container">
      <div className="headerContainer">
        <Link to="/CVBuilderPage">
          <KeyboardBackspaceIcon className="backButton" />
        </Link>
        <div className="userActionContainer">
          <div className="signoutLinkContainer">
            <div onClick={handleUserSignout}>Signout</div>
          </div>
        </div>
      </div>
      <div className="printActionContainer">
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="saveButton"
          onClick={handleOnCVPrint}
        >
          <PrintIcon /> Print CV
        </Button>
      </div>
      <div className="templateContainer">
        <TemplateStructure />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cvDetails: state.CVDetailsReducer.cvDetails,
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
  setCVDetails: (newCVDetails) => {
    dispatch(updateCVDetails(newCVDetails));
  },
  setServerCVDetails: (newServerCVDetails) => {
    dispatch(updateServerCVDetails(newServerCVDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Template1);
