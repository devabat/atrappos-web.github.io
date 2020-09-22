import React, {useState, useEffect, useRef} from 'react';
import {
    faPlusCircle,
    faEye,
    faEyeSlash,
    faTrash,
    faRoute,
    faExclamationTriangle,
    faUsers,
    faMap,
    faQuestionCircle, faTools
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Tab, Tabs} from "react-bootstrap";
import AddEditPath from "./AddEditPath";
import {useSelector} from "react-redux";
import store from "../../store";
import {setIsEmptyPath, setIsEmptyName, setSelectedTab} from "../../actions/pathsActions";
import MapSelection from "./MapSelection";
import {Logo} from "../layout/Logo";
import CommunityPaths from "./CommunityPaths";
import InfoTooltip from "../ui/InfoTooltip";
import {PathInfoTooltip} from "../ui/PathInfoTooltip";
import {LoaderPin} from "../ui/LoaderPin";
import {FilterPaths} from "./FilterPaths";
import {filterLbl} from "../../lib/constants";
import {sendGaEvent} from "../../lib/utils";
import {KPIs} from "../ui/KPIs";
import {FaqContent} from "../ui/FaqContent";


const PathsActions =(props)=> {
  const {userPaths,
      communityPaths,
      toggleSelectedPaths,
      toggleSelectedCommunityPaths,
      makePathEditable,
      savePath,
      handleInputName,
      setAttribute,
      setEditablePathState,
      showEditModal,
      showDeleteModal,
      selectedPathName,
      selectedPathDescription,
      pathName,
      pathDescription,
      canGoBack,
      disableBack,
      disableEdit,
      disableErase,
      disableStreetViewAndBack,
      existingPoly,
      modifyStyles,
      pathObjective,
      pathSubjective,
      changeCenter,
      addOrEditProcedure
  } = props;
  const [pathAction, setPathAction] = useState({show: false, action: ""});
  const [visibleUserPaths, setVisibleUserPaths] = useState([]);
  const [currUserPaths, setCurrUserPaths] = useState([]);
  const [viewState, setViewState] = useState({});
  const [showAllPaths, setShowAllPaths] = useState(false);
  const [filterPaths, setFilterPaths] = useState(false);
  const [filterObjective, setFilterObjective] = useState([]);
  const [filterSubjective, setFilterSubjective] = useState([]);
  const [filterResult, setFilterResult] = useState(null);
  const [disableBackHdr, setDisableBackHdr] = useState(false);
  const [disableEditBtn, setDisableEditBtn] = useState(false);
  const [disableEraseBtn, setDisableEraseBtn] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [resetCommunityPaths, setResetCommunityPaths] = useState(false);

  const showAllPathsRef = useRef(null);

  const filterPathsRef = useRef(null);

  const pathsReducer = useSelector(state => state.paths);

  const mapLayersReducer = useSelector(state => state.mapLayers);

  const ids = currUserPaths.map((path) => path._id);


  const returnBack = (dummy, canGoBack) => {
      if(pathsReducer.emptyPath || canGoBack) {
          setPathAction({show: false, action: ""});
      } else {
          showEditModal(true);
      }
  };
    const beforeAnimation = (animate) => {
        setAnimation(animate);
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

    useEffect(()=> {
        setDisableBackHdr(disableBack)
    }, [disableBack]);

    useEffect(()=> {
        setDisableEditBtn(disableEdit)
    }, [disableEdit]);

    useEffect(()=> {
        setDisableEraseBtn(disableErase)
    }, [disableErase]);

    useEffect(()=> {
        setCurrUserPaths(userPaths)
    }, [userPaths]);

    useEffect(()=> {
        setAddOrEdit(addOrEditProcedure)
    }, [addOrEditProcedure]);

    useEffect(()=> {
        if ((filterObjective || filterSubjective) && currUserPaths) {
            let filterArr =  currUserPaths.filter((path, idx) => {
                return  filterObjective.includes(path.properties.objective) ||
                    filterSubjective.includes(path.properties.subjective);
            });
            let filterRes = filterArr.map((path)=> {
                return path._id;
            })
            setFilterResult(filterRes ? filterRes.length : 0);
            showFilteredPaths(filterRes);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterObjective, filterSubjective, currUserPaths]);

    useEffect(()=> {
        if (!filterPaths) {
            setFilterObjective([]);
            setFilterSubjective([]);
            setFilterResult(null);
        }
    }, [filterPaths]);

    const toggleVisibleUserPaths = (id) => {
        let idx = visibleUserPaths.indexOf(id);
        if (idx > -1) {
            setShowAllPaths(false);
            visibleUserPaths.splice(idx, 1);
            sendGaEvent({category: "hide-single-user-path", action: 'map-action'});
        } else {
            sendGaEvent({category: "show-single-user-path", action: 'map-action'});
            visibleUserPaths.push(id);
        }
        if (filterPaths) {
            setFilterPaths(false);
        }
        if (visibleUserPaths.length === currUserPaths.length && visibleUserPaths.length > 0) {
            setShowAllPaths(true);
        }
        setViewState(prevState => ({ ...prevState, [id]: !prevState[id] }));
        setVisibleUserPaths(visibleUserPaths);
        toggleSelectedPaths(visibleUserPaths);
    };


    const toggleShowAllPaths= (e) => {
        let checked = e.target.checked;
        if (checked && filterPaths) {
            filterPathsRef.current.click();
        }
        setShowAllPaths(checked);
        if (checked) {
            setVisibleUserPaths(ids);
            toggleSelectedPaths(ids);
            sendGaEvent({category: "show-all-user-paths", action: 'map-action'});
        } else {
            setVisibleUserPaths([]);
            toggleSelectedPaths([]);
            sendGaEvent({category: "hide-all-user-paths", action: 'map-action'});
        }
        ids.forEach((id)=> {
            setViewState(prevState => ({ ...prevState, [id]: checked}));
        });
    };

    const showFilteredPaths = (arr) => {
        setVisibleUserPaths(arr);
        toggleSelectedPaths(arr);
        ids.forEach((id) => {
            setViewState(prevState => ({...prevState, [id]: arr.includes(id)}));
        });
    }

    const toggleFilterPaths = (e) => {
        let checked = e.target.checked;
        if (showAllPaths && checked) {
            showAllPathsRef.current.click();
        }
        setFilterPaths(checked);
        if (!checked) {
            setVisibleUserPaths([]);
            toggleSelectedPaths([]);
            ids.forEach((id)=> {
                setViewState(prevState => ({ ...prevState, [id]: false}));
            });
            sendGaEvent({category: "disable-filter-user-paths", action: 'map-action'});
        } else {
            sendGaEvent({category: "enable-filter-user-paths", action: 'map-action'});
        }
    }

    const applyFilters = (type, target) => {
        const checked = target.checked;
        const val = target.value;
        if (type === 'objective' ) {
            if (checked) {
                setFilterObjective([ ...filterObjective, val]);
            } else {
                setFilterObjective(filterObjective.filter((e)=>(e !== val)))
            }
        } else {
            if (checked) {
                setFilterSubjective([ ...filterSubjective, val]);
            } else {
                setFilterSubjective(filterSubjective.filter((e)=>(e !== val)))
            }
        }
    }

    const editPath = (id) => {
        setPathAction({show: true, action: "Edit"});
        makePathEditable(id);
        store.dispatch(setIsEmptyName(false));
        store.dispatch(setIsEmptyPath(false))
    };

    return (
      <main id="main-menu">
        <Logo logoCls="logo--map" />
        <Tabs defaultActiveKey={mapLayersReducer.selectedTab} activeKey={mapLayersReducer.selectedTab} id="path-actions-tabs" onSelect={k => {
            if (k === 'community') {
                // Reset user's paths selection and map view when community tab is selected
                setAnimation(false);
                setVisibleUserPaths([]);
                toggleSelectedPaths([]);
                setViewState({});
                if (showAllPaths) {
                    showAllPathsRef.current.click();
                }
                if (filterPaths) {
                    filterPathsRef.current.click();
                }
            }
            if (k === 'paths') {
                // Reset community's paths selection and map view when 'MY PATHS' tab is selected
                setResetCommunityPaths(true)
            } else {
                // Keep the variable alive to detect changes
                setResetCommunityPaths(false)
            }
            if (k === 'faq') {
                sendGaEvent({category: 'show-faq', action: 'user-action'});
            }
            store.dispatch(setSelectedTab(k))
        }}>
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
                                 parentPathName = {pathName}
                                 parentPathDescr = {pathDescription}
                                 selectedPathName={selectedPathName}
                                 selectedPathDescription={selectedPathDescription}
                                 canGoBack={canGoBack}
                                 beforeAnimation={beforeAnimation}
                                 disableBack={disableBackHdr}
                                 disableEditBtn={disableEditBtn}
                                 disableEraseBtn={disableEraseBtn}
                                 disableStreetViewAndBack={disableStreetViewAndBack}
                                 existingPoly={existingPoly}
                                 modifyStyles={modifyStyles}
                                 pathObjective={pathObjective}
                                 pathSubjective={pathSubjective}
                    />
                :
                    <div className={"tab__inner tab__inner--path-list" + (animation ? " animate": "")}>
                        <div className= "path-list">
                            <h2>My paths</h2>
                            <div className="path-btns path-btns--add">
                                <Button className="path--add" onClick={()=> {setPathAction({show: true, action: "Add"})}}>
                                    <i>
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </i>
                                    <span>
                                    Create
                                </span>
                                </Button>
                            </div>
                            <React.Fragment>
                                <h4 className="path-list__header">
                                    <span>
                                        Dashboard
                                    </span>
                                </h4>
                                <KPIs userPaths={userPaths} />
                                <h4 className="path-list__header">
                                    <span>
                                        List
                                    </span>
                                </h4>
                                <label className={"cbox-container userpaths" + (currUserPaths.length <= 0 ? " disable-list": "")}>
                                    <span className="cbox-lbl-txt">
                                        Show all in the map
                                    </span>
                                    <input type="checkbox"
                                           disabled={currUserPaths.length <= 0}
                                           checked={showAllPaths}
                                           ref={showAllPathsRef}
                                           onChange={toggleShowAllPaths}
                                    />
                                    <span className="cbox-checkmark"/>
                                </label>
                                {!filterPaths && visibleUserPaths !== null ?
                                    <div className="select-result__wrapper">
                                        <div className="select-result">
                                            {"Selected paths: " + visibleUserPaths.length}
                                        </div>
                                    </div>:null}
                                <div className="path-list--outer">
                                    <div className="path-list--wrapper">
                                        <div className="path-list--container">
                                            {currUserPaths && currUserPaths.length > 0 && pathsReducer.allPaths.fetched  ?
                                            <React.Fragment>
                                            {
                                                currUserPaths.map((path, idx)=> {
                                                    return <div className="path-list--item"
                                                                title={path.name}
                                                                key={path._id}
                                                                id={path._id}>
                                                        <div className='path-list__info--wrapper'>
                                                            <InfoTooltip id={path._id + '-tltp'} placement="bottom"
                                                                         gaEvent="user-path-list-info"
                                                                         pathDetails={true}
                                                                         pathName={path.name}
                                                                         content={<PathInfoTooltip subj={path.properties.subjective}
                                                                                                   obj={path.properties.objective}
                                                                                                   distance={path.distance}
                                                                                                   area={path.area}
                                                                                                   name={path.name}
                                                                                                   description={path.description}
                                                                                                   drawType={path.drawType}
                                                                                                   type='path-list'
                                                                         />}
                                                                         clsName='path-list-userpaths--row' />
                                                        </div>
                                                        <div className="path-list--btns">
                                                            <Button className={"path-list--item_show" + (viewState[path._id] ? " selected" : "") }
                                                                    title={viewState[path._id] ? "Hide from map" : "Show on map"}
                                                                    onClick={()=> {
                                                                        toggleVisibleUserPaths(path._id)
                                                                    }}>
                                                                <i>
                                                                    <FontAwesomeIcon icon={viewState[path._id] ? faEyeSlash : faEye}/>
                                                                </i>
                                                            </Button>
                                                            <Button className="path-list--item_edit"
                                                                    variant="info"
                                                                    title={"Edit"}
                                                                    onClick={()=> {
                                                                        editPath(path._id)
                                                                    }}>
                                                                <i>
                                                                    <FontAwesomeIcon icon={faTools}/>
                                                                </i>
                                                            </Button>
                                                            <Button className="path-list--item_delete"
                                                                    variant="danger"
                                                                    title={"Delete"}
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
                                            </React.Fragment>:null}
                                            {currUserPaths && currUserPaths.length <=0 && pathsReducer.allPaths.fetched  ?
                                                <div className="path-list--empty">
                                                    <i>
                                                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                                                    </i>
                                                    <span>You don't have any paths yet!</span>
                                                </div>:null
                                            }
                                            {pathsReducer.allPaths.fetching ?
                                                <LoaderPin />:null
                                            }
                                        </div>
                                    </div>
                                </div>
                                {currUserPaths && currUserPaths.length > 0 && pathsReducer.allPaths.fetched ?
                                    <div className="filter-paths--container">
                                        <div className="filter-paths--container__top">
                                            <label className={"cbox-container" + (currUserPaths.length <= 0 ? " disable-list": "")}>
                                                <span className="cbox-lbl-txt">
                                                           {filterLbl}
                                                </span>
                                                <input type="checkbox"
                                                       checked={filterPaths}
                                                       ref={filterPathsRef}
                                                       onChange={toggleFilterPaths}
                                                />
                                                <span className="cbox-checkmark"/>
                                            </label>
                                            {filterPaths && filterResult !== null ?
                                                <div className="filter-result">
                                                    {"Paths found: " + filterResult}
                                                </div>:null}
                                        </div>
                                        <FilterPaths
                                            active={filterPaths}
                                            applyFilters={applyFilters}
                                            filterObjective={filterObjective}
                                            filterSubjective={filterSubjective}
                                            category='user-paths'
                                        />
                                    </div>
                                :null}
                            </React.Fragment>
                        </div>
                    </div>
                }
            </Tab>
            <Tab eventKey="community" disabled={addOrEdit} title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faUsers} /></span>
                    <span className="tab-title">COMMUNITY</span>
                </React.Fragment>}>
                <CommunityPaths paths={communityPaths}
                                uPaths={userPaths}
                                toggleSelectedCommunityPaths={toggleSelectedCommunityPaths}
                                changeCenter={changeCenter}
                                resetCommunityPaths={resetCommunityPaths}
                />
            </Tab>

            <Tab eventKey="map" disabled={addOrEdit} title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faMap} /></span>
                    <span className="tab-title">MAP</span>
                </React.Fragment>}>
                <div className="map-selection">
                <MapSelection/>
                </div>
            </Tab>
            <Tab eventKey="faq" disabled={addOrEdit} title={
                <React.Fragment>
                    <span className="tab-icon"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    <span className="tab-title">FAQ</span>
                </React.Fragment>}>
                <h2>FAQ</h2>

                  <FaqContent />
            </Tab>
        </Tabs>
      </main>
  );
};

export default PathsActions;
