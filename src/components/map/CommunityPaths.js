import React, {useState, useEffect, useRef} from 'react';
import {Button} from "react-bootstrap";
import {
    faExclamationTriangle, faEye, faEyeSlash, faSearchLocation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoTooltip from "../ui/InfoTooltip";
import {PathInfoTooltip} from "../ui/PathInfoTooltip";
import {useSelector} from "react-redux";
import {LoaderPin} from "../ui/LoaderPin";
import {FilterPaths} from "./FilterPaths";
import {filterLbl} from "../../lib/constants";
import {sendGaEvent} from "../../lib/utils";

function CommunityPaths(props) {
    const {paths, toggleSelectedCommunityPaths, changeCenter} = props;
    const [communityPaths, setCommunityPaths] = useState([]);
    const [visibleCommunityPaths, setVisibleCommunityPaths] = useState([]);
    const [viewState, setViewState] = useState({});
    const [showAllPaths, setShowAllPaths] = useState(false);
    const [filterPaths, setFilterPaths] = useState(false);
    const [filterObjective, setFilterObjective] = useState(null);
    const [filterSubjective, setFilterSubjective] = useState(null);
    const [filterResult, setFilterResult] = useState(null);

    const showAllPathsRef = useRef(null);


    const pathsReducer = useSelector(state => state.paths);

    const ids = communityPaths.map((path) => path._id);

    useEffect(()=> {
        if (paths) {
            setCommunityPaths(paths)
        }
    }, [paths]);

    useEffect(()=> {
        if (filterObjective && filterSubjective && communityPaths) {
            let filterArr =  communityPaths.filter((path, idx) => {
                return path.properties.objective === filterObjective &&
                    path.properties.subjective === filterSubjective;
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
            setFilterObjective(null);
            setFilterSubjective(null);
            setFilterResult(null);
        }
    }, [filterPaths]);


    const toggleVisibleCommunityPaths = (id) => {
        let idx = visibleCommunityPaths.indexOf(id);
        if (idx > -1) {
            setShowAllPaths(false);
            visibleCommunityPaths.splice(idx, 1);
            sendGaEvent({category: "hide-single-community-path", action: 'map-action'});
        } else {
            visibleCommunityPaths.push(id);
            sendGaEvent({category: "show-single-community-path", action: 'map-action'});
        }
        if (filterPaths) {
            setFilterPaths(false);
        }
        setViewState(prevState => ({ ...prevState, [id]: !prevState[id] }));
        setVisibleCommunityPaths(visibleCommunityPaths);
        toggleSelectedCommunityPaths(visibleCommunityPaths);
    };

    const toggleShowAllPaths= (e) => {
        setShowAllPaths(e.target.checked);
        if (e.target.checked) {
            setVisibleCommunityPaths(ids);
            toggleSelectedCommunityPaths(ids);
            sendGaEvent({category: "show-all-community-paths", action: 'map-action'});
        } else {
            setVisibleCommunityPaths([]);
            toggleSelectedCommunityPaths([]);
            sendGaEvent({category: "hide-all-community-paths", action: 'map-action'});
        }
        let checked = e.target.checked;
        ids.forEach((id)=> {
            setViewState(prevState => ({ ...prevState, [id]: checked}));
        });
    };

    const showFilteredPaths = (arr) => {
        setVisibleCommunityPaths(arr);
        toggleSelectedCommunityPaths(arr);
        ids.forEach((id)=> {
            setViewState(prevState => ({ ...prevState, [id]: arr.includes(id)}));
        });
        if (arr.length === communityPaths.length) {
            setShowAllPaths(true);
        }
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

    const applyFilters = (type, val) => {
        if (type === 'objective' ) {
            setFilterObjective(val);
        } else {
            setFilterSubjective(val);
        }
    }

    const togglePathZoom = (id) => {
        let centerCoords;
        let filteredForZoom = communityPaths.filter(function(path) {
            return path._id === id;
        });

        let zoomPath = filteredForZoom[0];
        if (zoomPath) {
            let coords= zoomPath.geometry.coordinates;
            let middleIdx= Math.round((coords.length - 1) / 2);
            centerCoords = coords[middleIdx];
            changeCenter(centerCoords);
            sendGaEvent({category: "zoom-community-path", action: 'map-action'});
        }
    }

    return (
        <div className="tab__inner tab__inner--path-community">
            <h2>Community Paths</h2>
            <label className={"cbox-container" + (communityPaths.length <= 0 || filterPaths ? " disable-list": "")}>
                <span className="cbox-lbl-txt">
                    Show all community paths
                </span>
                <input type="checkbox"
                       disabled={communityPaths.length <= 0 || filterPaths }
                       checked={showAllPaths}
                       ref={showAllPathsRef}
                       onChange={toggleShowAllPaths}
                />
                <span className="cbox-checkmark"/>
            </label>
            <div className="path-list--outer">
                <div className="path-list--wrapper">
                    <div className="path-list--container">
                        {communityPaths && communityPaths.length > 0 && pathsReducer.allPaths.fetched ?
                            <React.Fragment>
                                {
                                    communityPaths.map((path, idx)=> {
                                        return <div className="path-list--item"
                                                    key={path._id}
                                                    id={path._id}>
                                            <div className='path-list__info--wrapper'>
                                                <InfoTooltip id={path._id + '-tltp'} placement="bottom"
                                                             gaEvent="community-path-list-info"
                                                             pathDetails={true}
                                                             content={<PathInfoTooltip subj={path.properties.subjective}
                                                                                       obj={path.properties.objective}
                                                                                       distance={path.distance}
                                                                                       area={path.area}
                                                                                       name={path.name}
                                                                                       description={path.description}
                                                                                       type='path-list'
                                                             />}
                                                             clsName='path-list-communitypaths--row' />
                                                <span className="path-list--item_name">
                                                        {path.name}
                                                    </span>
                                            </div>
                                            <div className="path-list--btns">
                                                <Button className="path-list--item_show"
                                                        title={viewState[path._id] ? "Hide from map" : "Show on map"}
                                                        onClick={()=> {
                                                            toggleVisibleCommunityPaths(path._id)
                                                        }}>
                                                    <i>
                                                        <FontAwesomeIcon icon={viewState[path._id] ? faEyeSlash : faEye}/>
                                                    </i>
                                                </Button>
                                                <Button className={"path-list--item_zoom"}
                                                        disabled={!viewState[path._id]}
                                                        title="Focus on map"
                                                        onClick={()=> {
                                                            togglePathZoom(path._id)
                                                        }}>
                                                    <i>
                                                        <FontAwesomeIcon icon={faSearchLocation}/>
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
                                   onChange={toggleFilterPaths}
                            />
                            <span className="cbox-checkmark"/>
                        </label>
                        {filterResult !== null ?
                            <div className="filter-result">
                                {"Paths found: " + filterResult}
                            </div>:null}
                    </div>
                    <FilterPaths
                        active={filterPaths}
                        applyFilters={applyFilters}
                        filterObjective={filterObjective}
                        filterSubjective={filterSubjective}
                    />
                </div>
            :null}
        </div>
    );
}

export default CommunityPaths;

