// Library Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";

// User Imports
import "./CVDetailsPage.scss";
import { updateGlobalOperationNotificationStatus } from "../../redux/GlobalOperation/GlobalOperationAction";
import { saveUserCVInfo, fetchUserCVInfo } from "../../firebase/init";
import { updateGlobalOperationOverlayStatus } from "../../redux/GlobalOperation/GlobalOperationAction";

// Component for creating sections
const CreateCVSection = (props) => {
  const [cardExpandStatus, setCardExpandStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(null);

  // Callback for card expand collapse
  const handleOnExpandClick = () => {
    setCardExpandStatus(!cardExpandStatus);
  };

  // Callback for Card Move up
  const handleSectionMoveUpClick = () => {
    if (props.cardID > 1) {
      props.setUserCVDetails((oldUserCVDetails) => [
        ...oldUserCVDetails.slice(0, props.cardID - 1),
        { ...oldUserCVDetails[props.cardID], cardID: props.cardID - 1 },
        { ...oldUserCVDetails[props.cardID - 1], cardID: props.cardID },
        ...oldUserCVDetails.slice(props.cardID + 1, oldUserCVDetails.length),
      ]);
    }
  };

  // Callback for Card Move Down
  const handleSectionMoveDownClick = () => {
    if (props.cardID > 0 && props.cardID !== props.userCVDetails.length - 1) {
      props.setUserCVDetails((oldUserCVDetails) => [
        ...oldUserCVDetails.slice(0, props.cardID),
        { ...oldUserCVDetails[props.cardID + 1], cardID: props.cardID },
        { ...oldUserCVDetails[props.cardID], cardID: props.cardID + 1 },
        ...oldUserCVDetails.slice(props.cardID + 2, oldUserCVDetails.length),
      ]);
    }
  };

  // Callback for Card Delete
  const handleSectionDeleteClick = () => {
    if (props.cardID > 0) {
      props.setUserCVDetails((oldUserCVDetails) =>
        oldUserCVDetails
          .filter((oldUserCVDetail) => oldUserCVDetail.cardID !== props.cardID)
          .map((oldUserCVDetail, oldUserCVDetailIndex) => {
            oldUserCVDetail.cardID = oldUserCVDetailIndex;
            return oldUserCVDetail;
          })
      );
    }
  };

  // Callback for adding group
  const handleAddGroup = () => {
    props.setUserCVDetails((oldUserCVDetails) => [
      ...oldUserCVDetails.slice(0, props.cardID),
      {
        ...oldUserCVDetails[props.cardID],
        groups: [...oldUserCVDetails[props.cardID].groups, []],
      },
      ...oldUserCVDetails.slice(props.cardID + 1, oldUserCVDetails.length),
    ]);
  };

  // CAllback for adding block
  const handleAddBlock = (event, currentGroupIndex) => {
    setCurrentGroupIndex(currentGroupIndex);
    setAnchorEl(event.currentTarget);
  };

  // Callback for adding a list item
  const handleAddListItem = (event, groupIndex, blockIndex) => {
    props.setUserCVDetails((oldUserCVDetails) => [
      ...oldUserCVDetails.slice(0, props.cardID),
      {
        ...oldUserCVDetails[props.cardID],
        groups: [
          ...oldUserCVDetails[props.cardID].groups.slice(0, groupIndex),
          [
            ...oldUserCVDetails[props.cardID].groups[groupIndex].slice(
              0,
              blockIndex
            ),
            {
              blockType: "List",
              listItems: [
                ...oldUserCVDetails[props.cardID].groups[groupIndex][blockIndex]
                  .listItems,
                "",
              ],
            },
            ...oldUserCVDetails[props.cardID].groups[groupIndex].slice(
              blockIndex + 1,
              oldUserCVDetails[props.cardID].groups[groupIndex].length
            ),
          ],
          ...oldUserCVDetails[props.cardID].groups.slice(
            groupIndex + 1,
            oldUserCVDetails[props.cardID].groups.length
          ),
        ],
      },
      ...oldUserCVDetails.slice(props.cardID + 1, oldUserCVDetails.length),
    ]);
  };

  // Callback for selecting block element
  const handleBlockSelectionClose = (event, selectedBlockName) => {
    let newBlockObj = {};
    if (selectedBlockName === "Sentence") {
      newBlockObj = {
        blockType: selectedBlockName,
        sentenceValue: "",
      };
    } else if (selectedBlockName === "List") {
      newBlockObj = {
        blockType: selectedBlockName,
        listItems: [""],
      };
    } else if (selectedBlockName === "Header") {
      newBlockObj = {
        blockType: selectedBlockName,
        leftHeaderValue: "",
        rightHeaderValue: "",
      };
    } else if (selectedBlockName === "Tabular") {
      newBlockObj = {
        blockType: selectedBlockName,
        leftTabularValue: "",
        rightTabularValue: "",
      };
    }
    setAnchorEl(null);
    if (selectedBlockName.length) {
      props.setUserCVDetails((oldUserCVDetails) => [
        ...oldUserCVDetails.slice(0, props.cardID),
        {
          ...oldUserCVDetails[props.cardID],
          groups: [
            ...oldUserCVDetails[props.cardID].groups.slice(
              0,
              currentGroupIndex
            ),
            [
              ...oldUserCVDetails[props.cardID].groups[currentGroupIndex],
              newBlockObj,
            ],
            ...oldUserCVDetails[props.cardID].groups.slice(
              currentGroupIndex + 1,
              oldUserCVDetails[props.cardID].groups.length
            ),
          ],
        },
        ...oldUserCVDetails.slice(props.cardID + 1, oldUserCVDetails.length),
      ]);
    }
  };

  // Utility method for calculating the number of ocurances of a particualr block type
  const calculateBlockCount = (
    groups,
    searchBlockType,
    searchGroupIndex,
    searchBlockIndex
  ) => {
    let blockCount = 0;
    groups.forEach((groupInfo, groupIndex) => {
      if (groupIndex <= searchGroupIndex) {
        groupInfo.forEach((blockInfo, blockIndex) => {
          if (groupIndex < searchGroupIndex) {
            if (blockInfo.blockType === searchBlockType) {
              blockCount += 1;
            }
          } else if (groupIndex === searchGroupIndex) {
            if (
              blockInfo.blockType === searchBlockType &&
              blockIndex <= searchBlockIndex
            ) {
              blockCount += 1;
            }
          }
        });
      }
    });
    return blockCount;
  };

  // Callback for section name change
  const handleSectionNameChange = (event) => {
    props.setUserCVDetails((oldUserCVDetails) => [
      ...oldUserCVDetails.slice(0, props.cardID),
      {
        ...oldUserCVDetails[props.cardID],
        sectionName: event.target.value,
      },
      ...oldUserCVDetails.slice(props.cardID + 1, oldUserCVDetails.length),
    ]);
  };

  const handleBlockValueChange = (
    event,
    groupIndex,
    blockIndex,
    changeBlockType,
    { changeListItemIndex, changeListItems, inputHeader, inputTabular } = {}
  ) => {
    let changeObj = {};
    if (changeBlockType === "Sentence") {
      changeObj = {
        sentenceValue: event.target.value,
      };
    } else if (changeBlockType === "List") {
      changeObj = {
        listItems: [
          ...changeListItems.slice(0, changeListItemIndex),
          event.target.value,
          ...changeListItems.slice(
            changeListItemIndex + 1,
            changeListItems.length
          ),
        ],
      };
    } else if (changeBlockType === "Header") {
      if (inputHeader === "Left") {
        changeObj = {
          leftHeaderValue: event.target.value,
        };
      } else if (inputHeader === "Right") {
        changeObj = {
          rightHeaderValue: event.target.value,
        };
      }
    } else if (changeBlockType === "Tabular") {
      if (inputTabular === "Left") {
        changeObj = {
          leftTabularValue: event.target.value,
        };
      } else if (inputTabular === "Right") {
        changeObj = {
          rightTabularValue: event.target.value,
        };
      }
    }
    props.setUserCVDetails((oldUserCVDetails) => [
      ...oldUserCVDetails.slice(0, props.cardID),
      {
        ...oldUserCVDetails[props.cardID],
        groups: [
          ...oldUserCVDetails[props.cardID].groups.slice(0, groupIndex),
          [
            ...oldUserCVDetails[props.cardID].groups[groupIndex].slice(
              0,
              blockIndex
            ),
            {
              ...oldUserCVDetails[props.cardID].groups[groupIndex][blockIndex],
              ...changeObj,
            },
            ...oldUserCVDetails[props.cardID].groups[groupIndex].slice(
              blockIndex + 1,
              oldUserCVDetails[props.cardID].groups[groupIndex].length
            ),
          ],
          ...oldUserCVDetails[props.cardID].groups.slice(
            groupIndex + 1,
            oldUserCVDetails[props.cardID].groups.length
          ),
        ],
      },
      ...oldUserCVDetails.slice(props.cardID + 1, oldUserCVDetails.length),
    ]);
  };

  return (
    <Card className="cvDetailCardContainer">
      <CardContent className="cvDetailCardHeader">
        <div className="cvDetailCardSectionName">
          {props.isSectionNameEditable ? (
            <TextField
              label="Section"
              variant="outlined"
              value={props.sectionName}
              onChange={handleSectionNameChange}
            />
          ) : (
            props.sectionName
          )}
        </div>
        <div>
          {props.cardID > 0 && props.cardID !== props.userCVDetails.length - 1 && (
            <IconButton onClick={handleSectionMoveDownClick}>
              <ArrowDownwardIcon />
            </IconButton>
          )}
          {props.cardID > 1 && (
            <IconButton onClick={handleSectionMoveUpClick}>
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {props.cardID > 0 && (
            <IconButton onClick={handleSectionDeleteClick}>
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton onClick={handleOnExpandClick}>
            {cardExpandStatus ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </div>
      </CardContent>
      <Collapse in={cardExpandStatus} timeout="auto">
        <CardContent>
          {props.contentType === "nameContent" && (
            <TextField label="Your Name" variant="outlined" />
          )}
          {props.groups.length > 0 && (
            <div className="groupsContainer">
              {props.groups.map((groupInfo, groupIndex) => {
                return (
                  <div
                    className="groupContainer"
                    key={`groupContainer${groupIndex}`}
                  >
                    {groupInfo.map((blockInfo, blockIndex) => (
                      <div
                        key={`blockContainer${blockIndex}`}
                        className="blockContainer"
                      >
                        {blockInfo.blockType === "Sentence" && (
                          <TextField
                            label={`Sentence ${calculateBlockCount(
                              props.groups,
                              "Sentence",
                              groupIndex,
                              blockIndex
                            )}`}
                            variant="outlined"
                            value={blockInfo.sentenceValue}
                            fullWidth
                            onChange={(event) =>
                              handleBlockValueChange(
                                event,
                                groupIndex,
                                blockIndex,
                                "Sentence"
                              )
                            }
                          />
                        )}
                        {blockInfo.blockType === "List" &&
                          blockInfo.listItems.map((listItem, listItemIndex) => (
                            <div
                              className="listChildren"
                              key={`List${groupIndex}${blockIndex}${listItemIndex}`}
                            >
                              <TextField
                                label={`List ${calculateBlockCount(
                                  props.groups,
                                  "List",
                                  groupIndex,
                                  blockIndex
                                )} - Item ${listItemIndex + 1}`}
                                variant="outlined"
                                value={listItem}
                                fullWidth
                                onChange={(event) =>
                                  handleBlockValueChange(
                                    event,
                                    groupIndex,
                                    blockIndex,
                                    "List",
                                    {
                                      changeListItemIndex: listItemIndex,
                                      changeListItems: blockInfo.listItems,
                                    }
                                  )
                                }
                              />
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                className={
                                  listItemIndex ===
                                  blockInfo.listItems.length - 1
                                    ? ""
                                    : "hideMe"
                                }
                                onClick={(event) => {
                                  handleAddListItem(
                                    event,
                                    groupIndex,
                                    blockIndex
                                  );
                                }}
                              >
                                <AddIcon />
                              </Button>
                            </div>
                          ))}
                        {blockInfo.blockType === "Header" && (
                          <div className="headerChildren">
                            <TextField
                              label={`Left Header ${calculateBlockCount(
                                props.groups,
                                "Header",
                                groupIndex,
                                blockIndex
                              )}`}
                              className="leftHeader"
                              variant="outlined"
                              value={blockInfo.leftHeaderValue}
                              fullWidth
                              onChange={(event) =>
                                handleBlockValueChange(
                                  event,
                                  groupIndex,
                                  blockIndex,
                                  "Header",
                                  { inputHeader: "Left" }
                                )
                              }
                            />
                            <TextField
                              label={`Right Header ${calculateBlockCount(
                                props.groups,
                                "Header",
                                groupIndex,
                                blockIndex
                              )}`}
                              className="rightHeader"
                              variant="outlined"
                              value={blockInfo.rightHeaderValue}
                              fullWidth
                              onChange={(event) =>
                                handleBlockValueChange(
                                  event,
                                  groupIndex,
                                  blockIndex,
                                  "Header",
                                  { inputHeader: "Right" }
                                )
                              }
                            />
                          </div>
                        )}
                        {blockInfo.blockType === "Tabular" && (
                          <div className="tabularChildren">
                            <TextField
                              label={`Left Tabular Element ${calculateBlockCount(
                                props.groups,
                                "Tabular",
                                groupIndex,
                                blockIndex
                              )}`}
                              className="leftTabular"
                              variant="outlined"
                              value={blockInfo.leftTabularValue}
                              fullWidth
                              onChange={(event) =>
                                handleBlockValueChange(
                                  event,
                                  groupIndex,
                                  blockIndex,
                                  "Tabular",
                                  { inputTabular: "Left" }
                                )
                              }
                            />
                            <TextField
                              label={`Right Tabular Element ${calculateBlockCount(
                                props.groups,
                                "Tabular",
                                groupIndex,
                                blockIndex
                              )}`}
                              className="rightTabular"
                              variant="outlined"
                              value={blockInfo.rightTabularValue}
                              fullWidth
                              onChange={(event) =>
                                handleBlockValueChange(
                                  event,
                                  groupIndex,
                                  blockIndex,
                                  "Tabular",
                                  { inputTabular: "Right" }
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={(event) => handleAddBlock(event, groupIndex)}
                    >
                      <AddIcon /> Add Block
                    </Button>
                    <Menu
                      key={`menu${groupIndex}`}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={(event) => handleBlockSelectionClose(event, "")}
                    >
                      <MenuItem
                        onClick={(event) =>
                          handleBlockSelectionClose(event, "Sentence")
                        }
                      >
                        Sentence
                      </MenuItem>
                      <MenuItem
                        onClick={(event) =>
                          handleBlockSelectionClose(event, "List")
                        }
                      >
                        List
                      </MenuItem>
                      <MenuItem
                        onClick={(event) =>
                          handleBlockSelectionClose(event, "Header")
                        }
                      >
                        Header
                      </MenuItem>
                      <MenuItem
                        onClick={(event) =>
                          handleBlockSelectionClose(event, "Tabular")
                        }
                      >
                        Tabular
                      </MenuItem>
                    </Menu>
                  </div>
                );
              })}
            </div>
          )}
          {props.contentType === "groupContent" && (
            <div className="addGroupButton">
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleAddGroup}
              >
                <AddIcon /> Add Group
              </Button>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

function CVDetailsPage(props) {
  const [userCVDetails, setUserCVDetails] = useState([
    {
      sectionName: "Name",
      isSectionNameEditable: false,
      contentType: "nameContent",
      cardID: 0,
      groups: [],
    },
  ]);
  useEffect(() => {
    console.log(userCVDetails);
  }, [userCVDetails]);

  useEffect(() => {
    // For fetching the details and saving it on firebase db
    getUserData().then((res) => {
      if (res && res.length) {
        setUserCVDetails(res);
      }
    });
  }, []);

  // Utility function for getting the user data
  const getUserData = () => {
    props.setGlobalOverlayStatus(true);
    return new Promise((resolve) => {
      fetchUserCVInfo()
        .then((res) => {
          props.setGlobalOverlayStatus(false);
          handleAlertOpen("success", "User data fetch successfully!");
          resolve(res);
        })
        .catch((error) => {
          props.setGlobalOverlayStatus(false);
          handleAlertOpen("error", `User data fetch failed! ${error}`);
          resolve(undefined);
        });
    });
  };

  // Utility function for saving the user data
  const saveUserData = (data) => {
    props.setGlobalOverlayStatus(true);
    saveUserCVInfo(data)
      .then(() => {
        props.setGlobalOverlayStatus(false);
        handleAlertOpen("success", "Data saved successfully!");
      })
      .catch((error) => {
        props.setGlobalOverlayStatus(false);
        handleAlertOpen("error", `Data save failed! ${error}`);
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

  // Callback for save button click
  const handleCVInfoSave = () => {
    saveUserData(userCVDetails);
  };

  // Callback for add Section button
  const handleAddSection = () => {
    setUserCVDetails((oldUserCVDetails) => [
      ...oldUserCVDetails,
      {
        sectionName: "",
        isSectionNameEditable: true,
        contentType: "groupContent",
        cardID: oldUserCVDetails.length,
        groups: [],
      },
    ]);
  };

  return (
    <div className="cvDetailsPageContainer">
      {userCVDetails.map((userCVDetail, userCVDetailIndex) => (
        <CreateCVSection
          key={`createCVSection${userCVDetailIndex}`}
          sectionName={userCVDetail.sectionName}
          isSectionNameEditable={userCVDetail.isSectionNameEditable}
          contentType={userCVDetail.contentType}
          cardID={userCVDetail.cardID}
          userCVDetails={userCVDetails}
          groups={userCVDetail.groups}
          setUserCVDetails={setUserCVDetails}
        />
      ))}
      <div className="addSectionButtonContainer">
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddSection}
        >
          <AddIcon /> Add Section
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleCVInfoSave}
        >
          <SaveIcon /> Save
        </Button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setGlobalNotificationStatus: (newNotificationInfo) => {
    dispatch(updateGlobalOperationNotificationStatus(newNotificationInfo));
  },
  setGlobalOverlayStatus: (newStatus) => {
    dispatch(updateGlobalOperationOverlayStatus(newStatus));
  },
});

export default connect(null, mapDispatchToProps)(CVDetailsPage);
