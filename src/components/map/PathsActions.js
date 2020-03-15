import React, {useState, useEffect} from 'react';
import {
    faPlusCircle,
    faEye,
    faEyeSlash,
    faTools,
    faTrash,
    faRoute,
    faArrowsAltV,
    faExclamationTriangle,
    faUsers,
    faMap,
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Tab, Tabs} from "react-bootstrap";
import AddEditPath from "./AddEditPath";
import {useSelector} from "react-redux";
import store from "../../store";
import {setIsEmptyCollection, setIsEmptyName} from "../../actions/actions";
import MapSelection from "./MapSelection";

const PathsActions =(props)=> {
  const {userPaths,
      toggleSelectedPaths,
      makePathEditable,
      savePath,
      handleInputName,
      setAttribute,
      setEditablePathState,
      showEditModal,
      showDeleteModal,
      selectedPathName,
      canGoBack} = props;
  const [pathAction, setPathAction] = useState({show: false, action: ""});
  const [key, setKey] = useState('paths');
  const [visibleUserPaths, setVisibleUserPaths] = useState([]);
  const [viewState, setViewState] = useState(false);
  const [showAllPaths, setShowAllPaths] = useState(false);

  const emptyEls = useSelector(state => state.paths);
  const ids= userPaths.map((path) => path._id);

  const returnBack = (dummy, canGoBack) => {
      if(emptyEls.emptyCollection || canGoBack) {
          setPathAction({show: false, action: ""});
      } else {
          showEditModal(true);
      }
  };

    useEffect(()=> {
        setEditablePathState(pathAction.action, pathAction.show);
    }, [pathAction, setEditablePathState]);

    useEffect(()=> {
        if (canGoBack) {
            returnBack(null, canGoBack)
        }
        // eslint-disable-next-line
    }, [canGoBack]);

    const toggleVisibleUserPaths = (id) => {
        let idx = visibleUserPaths.indexOf(id);
        if (idx > -1) {
            visibleUserPaths.splice(idx, 1);
        } else {
            visibleUserPaths.push(id);
        }
        setViewState(prevState => ({ ...prevState, [id]: !prevState[id] }));
        setVisibleUserPaths(visibleUserPaths);
        toggleSelectedPaths(visibleUserPaths);
    };

    const toggleShowAllPaths= (e) => {
        setShowAllPaths(e.target.checked);
        if (e.target.checked) {
            setVisibleUserPaths(ids);
            toggleSelectedPaths(ids);
        } else {
            setVisibleUserPaths([]);
            toggleSelectedPaths([]);
        }
        let checked = e.target.checked;
        ids.forEach((id)=> {
            setViewState(prevState => ({ ...prevState, [id]: checked}));
        });
    };

    const editPath = (id) => {
        setPathAction({show: true, action: "Edit"});
        makePathEditable(id);
        store.dispatch(setIsEmptyName(false));
        store.dispatch(setIsEmptyCollection(false))
    };


    return (
      <React.Fragment>
          <h1 className="logo">Atrappos</h1>
        <Tabs defaultActiveKey="paths" activeKey={key} id="path-actions-tabs" onSelect={k => setKey(k)}>
            <Tab eventKey="paths" title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faRoute} /></span>
                    <span className="tab-title">MY PATHS</span>
                </React.Fragment>}>
                {pathAction.show ?
                    <AddEditPath savePath={savePath}
                                 handleInputName={handleInputName}
                                 pathAction={pathAction.action}
                                 returnBack={returnBack}
                                 setAttribute={setAttribute}
                                 setEditablePathState = {setEditablePathState}
                                 selectedPathName={selectedPathName}
                                 canGoBack={canGoBack}
                    />
                :
                    <div className="tab__inner tab__inner--path-list">
                        <div className="path-list">
                            <h2>My paths</h2>
                            <React.Fragment>
                                <label className={"cbox-container" + (userPaths.length <= 0 ? " empty-list": "")}>
                                    <span className="cbox-lbl-txt">
                                        Show all my paths
                                    </span>
                                    <input type="checkbox"
                                           disabled={userPaths.length <= 0 }
                                           checked={showAllPaths}
                                           onChange={toggleShowAllPaths}
                                    />
                                <span className="cbox-checkmark"/>
                                </label>
                            <div className="path-list--outter">
                                <div className="path-list--wrapper">
                                    <div className="path-list--container">
                                        {userPaths && userPaths.length > 0 ?
                                        <React.Fragment>
                                        {
                                            userPaths.map((path, idx)=> {
                                                return <div className="path-list--item"
                                                            key={path._id}
                                                            id={path._id}>
                                                        <span className="path-list--item_name">
                                                            {path.name}
                                                        </span>
                                                    <div className="path-list--btns">
                                                        <Button className="path-list--item_show"
                                                                title={viewState[path._id] ? "Hide this path" : "Show this path"}
                                                                onClick={()=> {
                                                                    toggleVisibleUserPaths(path._id)
                                                                }}>
                                                            <i>
                                                                <FontAwesomeIcon icon={viewState[path._id] ? faEyeSlash : faEye}/>
                                                            </i>
                                                        </Button>
                                                        <Button className="path-list--item_edit"
                                                                variant="info"
                                                                title={"Edit this path"}
                                                                onClick={()=> {
                                                                    editPath(path._id)
                                                                }}>
                                                            <i>
                                                                <FontAwesomeIcon icon={faTools}/>
                                                            </i>
                                                        </Button>
                                                        <Button className="path-list--item_delete"
                                                                variant="danger"
                                                                title={"Delete this path"}
                                                                onClick={()=> {
                                                                    showDeleteModal(true, path.name, path._id)
                                                                }}>
                                                            <i>
                                                                <FontAwesomeIcon icon={faTrash}/>
                                                            </i>
                                                        </Button>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        </React.Fragment>:
                                            <div className="path-list--empty">
                                                <i>
                                                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                                                </i>
                                                <span>You don't have any paths yet!</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="path-list--scroll"
                                     title="The path list is scrollable">
                                    <FontAwesomeIcon icon={faArrowsAltV} />
                                </div>
                            </div>
                            </React.Fragment>
                        </div>
                        <div className="path-btns">
                            <Button className="path--add" onClick={()=> {setPathAction({show: true, action: "Add"})}}>
                                <i>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </i>
                                <span>
                                    Add a new path
                                </span>
                            </Button>
                        </div>
                    </div>
                }
            </Tab>
            <Tab eventKey="community" title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faUsers} /></span>
                    <span className="tab-title">COMMUNITY</span>
                </React.Fragment>}>
                <div id="other-paths__view"></div>
            </Tab>

            <Tab eventKey="map" title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faMap} /></span>
                    <span className="tab-title">MAP</span>
                </React.Fragment>}>
                <div className="map-selection">
                <MapSelection/>
                </div>
            </Tab>
            <Tab eventKey="faq" title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    <span className="tab-title">FAQ</span>
                </React.Fragment>}>

              fAAAQ
            </Tab>
        </Tabs>
      </React.Fragment>
  );
};

export default PathsActions;
