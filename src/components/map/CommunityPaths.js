import React, {useState, useEffect, useRef} from 'react';
import {Button} from "react-bootstrap";
import {
    faExclamationTriangle, faEye, faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoTooltip from "../ui/InfoTooltip";
import {PathInfoTooltip} from "../ui/PathInfoTooltip";
import {useDispatch, useSelector} from "react-redux";
import {LoaderPin} from "../ui/LoaderPin";
import {FilterPaths} from "./FilterPaths";
import {filterLbl} from "../../lib/constants";
import {sendGaEvent} from "../../lib/utils";
import {setIncludeUserPathsReducer} from "../../actions/pathsActions";

function CommunityPaths(props) {
    const {paths, uPaths, toggleSelectedCommunityPaths, resetCommunityPaths} = props;
    const [communityPaths, setCommunityPaths] = useState([]);
    const [propCommunityPaths, setPropCommunityPaths] = useState([]);
    const [userPaths, setUserPaths] = useState([]);
    const [includeUserPaths, setIncludeUserPaths] = useState(false);
    const [ids, setIds] = useState([]);
    const [visibleCommunityPaths, setVisibleCommunityPaths] = useState([]);
    const [viewState, setViewState] = useState({});
    const [showAllPaths, setShowAllPaths] = useState(false);
    const [filterPaths, setFilterPaths] = useState(false);
    const [filterObjective, setFilterObjective] = useState([]);
    const [filterSubjective, setFilterSubjective] = useState([]);
    const [filterResult, setFilterResult] = useState(null);

    const showAllPathsRef = useRef(null);

    const filterPathsRef = useRef(null);

    const pathsReducer = useSelector(state => state.paths);

    const authReducer = useSelector(state => state.auth);

    const reduxDispatch = useDispatch();

    useEffect(()=> {
        if (paths) {
            setCommunityPaths(paths)
            setPropCommunityPaths(paths)
        }
    }, [paths]);

    useEffect(()=> {
        if (uPaths) {
            setUserPaths(uPaths)
        }
    }, [uPaths]);

    useEffect(()=> {
        const ids = communityPaths.map((path) => path._id);
        setIds(ids);
    }, [communityPaths]);

    useEffect(()=> {
        let checked = pathsReducer.includeUserPaths;
        setIncludeUserPaths(checked && userPaths.length > 0);
    }, [pathsReducer.includeUserPaths, userPaths.length]);

    useEffect(()=> {
        if (includeUserPaths) {
            let newList = userPaths.concat(propCommunityPaths);
            setCommunityPaths(newList);
            let ids = newList.map((path) => path._id);
            setIds(ids);
        } else {
            setCommunityPaths(propCommunityPaths);
            let ids = propCommunityPaths.map((path) => path._id);
            setIds(ids);
            userPaths.forEach((path) => {
                if (viewState[path._id]) {
                    setViewState(prevState => ({ ...prevState, [path._id]: false}));
                    setVisibleCommunityPaths(prevState => (prevState.filter(e => e !== path._id)));
                    toggleSelectedCommunityPaths(visibleCommunityPaths.filter(e => e !== path._id));
                }
            })

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [includeUserPaths, userPaths.length > 0, communityPaths.length > 0])


    useEffect(()=> {
        if (showAllPaths && includeUserPaths && ids && ids.length > 0) {
            setVisibleCommunityPaths(ids);
            toggleSelectedCommunityPaths(visibleCommunityPaths);
            ids.forEach((id)=> {
                setViewState(prevState => ({ ...prevState, [id]: true}));
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids, showAllPaths, includeUserPaths])


    useEffect(()=> {
        if ((filterObjective || filterSubjective) && communityPaths) {
            let filterArr =  communityPaths.filter((path, idx) => {
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
    }, [filterObjective, filterSubjective, communityPaths]);

    useEffect(()=> {
        if (!filterPaths) {
            setFilterObjective([]);
            setFilterSubjective([]);
            setFilterResult(null);
        }
    }, [filterPaths]);

    useEffect(()=> {
        if (resetCommunityPaths) {
            setVisibleCommunityPaths([]);
            toggleSelectedCommunityPaths([]);
            setViewState({});
            if (showAllPaths) {
                showAllPathsRef.current.click();
            }
            if (filterPaths) {
                filterPathsRef.current.click();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetCommunityPaths]);
    

    const toggleVisibleCommunityPaths = (id) => {
        let idx = visibleCommunityPaths.indexOf(id);
        let visiblePathsCopy = JSON.parse(JSON.stringify(visibleCommunityPaths))
        if (idx > -1) {
            setShowAllPaths(false);
            visiblePathsCopy.splice(idx, 1);
            sendGaEvent({category: "hide-single-community-path", action: 'map-action'});
        } else {
            visiblePathsCopy.push(id);
            sendGaEvent({category: "show-single-community-path", action: 'map-action'});
        }
        if (filterPaths) {
            setFilterPaths(false);
        }
        if (visiblePathsCopy.length === communityPaths.length && visiblePathsCopy.length > 0) {
            setShowAllPaths(true);
        }
        setViewState(prevState => ({ ...prevState, [id]: !prevState[id] }));
        setVisibleCommunityPaths(visiblePathsCopy);
        toggleSelectedCommunityPaths(visiblePathsCopy);
    };

    const toggleShowAllPaths= (e) => {
        let checked =  e.target.checked;
        if (checked && filterPaths) {
            filterPathsRef.current.click();
        }
        setShowAllPaths(checked);
        if (e.target.checked) {
            setVisibleCommunityPaths(ids);
            toggleSelectedCommunityPaths(ids);
            sendGaEvent({category: "show-all-community-paths", action: 'map-action'});
        } else {
            setVisibleCommunityPaths([]);
            toggleSelectedCommunityPaths([]);
            sendGaEvent({category: "hide-all-community-paths", action: 'map-action'});
        }
        ids.forEach((id)=> {
            setViewState(prevState => ({ ...prevState, [id]: checked}));
        });
    };

    const toggleIncludeUserPaths= (e) => {
        const checked = e.target.checked;
        reduxDispatch(setIncludeUserPathsReducer(checked));
    };

    const showFilteredPaths = (arr) => {
        setVisibleCommunityPaths(arr);
        toggleSelectedCommunityPaths(arr);
        ids.forEach((id) => {
            setViewState(prevState => ({...prevState, [id]: arr.includes(id)}));
        });
    }

    const toggleFilterPaths = (e) => {
        let checked = e.target.checked;
        setFilterPaths(checked);
        if (showAllPaths && checked) {
            showAllPathsRef.current.click();
        }
        if (!checked) {
            setVisibleCommunityPaths([]);
            toggleSelectedCommunityPaths([]);
            ids.forEach((id)=> {
                setViewState(prevState => ({ ...prevState, [id]: false}));
            });
            sendGaEvent({category: "disable-filter-community-paths", action: 'map-action'});
        } else {
            sendGaEvent({category: "enable-filter-community-paths", action: 'map-action'});
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

    return (
        <div className="tab__inner tab__inner--path-community">
            <h2>Community Paths</h2>
            <div className='cbox--wrapper'>
                <label className={"cbox-container cbox--include-user" + (!userPaths ||
                    (userPaths && userPaths.length <= 0) ? " disable-list": "")}>
                            <span className="cbox-lbl-txt">
                                Include my paths
                            </span>
                    <input type="checkbox"
                           disabled={!userPaths || (userPaths && userPaths.length <= 0)}
                           checked={includeUserPaths}
                           onChange={toggleIncludeUserPaths}
                    />
                    <span className="cbox-checkmark"/>
                </label>
                <label className={"cbox-container" + (communityPaths.length <= 0 ? " disable-list": "")}>
                    <span className="cbox-lbl-txt">
                        Show all in the map
                    </span>
                    <input type="checkbox"
                           disabled={communityPaths.length <= 0}
                           checked={showAllPaths}
                           ref={showAllPathsRef}
                           onChange={toggleShowAllPaths}
                    />
                    <span className="cbox-checkmark"/>
                </label>
            </div>
            {!filterPaths && visibleCommunityPaths !== null ?
                <div className="select-result__wrapper">
                    <div className="select-result">
                        {"Selected paths: " + visibleCommunityPaths.length}
                    </div>
                </div> :null}
            <div className="path-list--outer">
                <div className="path-list--wrapper">
                    <div className="path-list--container">
                        {communityPaths && communityPaths.length > 0 && pathsReducer.allPaths.fetched ?
                            <React.Fragment>
                                {
                                    communityPaths.map((path, idx)=> {
                                        return <div className={"path-list--item" + (authReducer.user.id === path.userId ?
                                                " path-list--item__user" : ""
                                        )}
                                                    title={path.name}
                                                    key={path._id}
                                                    id={path._id}>
                                            <div className='path-list__info--wrapper'>
                                                <InfoTooltip id={path._id + '-tltp'} placement="bottom"
                                                             gaEvent="community-path-list-info"
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
                                                             clsName='path-list-communitypaths--row' />
                                            </div>
                                            <div className="path-list--btns">
                                                <Button className={"path-list--item_show" + (viewState[path._id] ? " selected" : "") }
                                                        title={viewState[path._id] ? "Hide from map" : "Show on map"}
                                                        onClick={()=> {
                                                            toggleVisibleCommunityPaths(path._id)
                                                        }}>
                                                    <i>
                                                        <FontAwesomeIcon icon={viewState[path._id] ? faEyeSlash : faEye}/>
                                                    </i>
                                                </Button>
                                            </div>
                                        </div>
                                    })
                                }
                            </React.Fragment>:null}
                            {communityPaths && communityPaths.length <=0 && pathsReducer.allPaths.fetched  ?
                                <div className="path-list--empty">
                                    <i>
                                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                                    </i>
                                    <span>There are no community paths available yet.</span>
                                </div>:null
                            }
                            {pathsReducer.allPaths.fetching ?
                                <LoaderPin />:null
                            }
                    </div>
                </div>
            </div>
            {communityPaths && communityPaths.length > 0 && pathsReducer.allPaths.fetched ?
                <div className="filter-paths--container">
                    <div className="filter-paths--container__top">
                        <label className={"cbox-container" + (communityPaths.length <= 0 ? " disable-list": "")}>
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
                        category='comm-paths'
                    />
                </div>
            :null}
        </div>
    );
}

export default CommunityPaths;

