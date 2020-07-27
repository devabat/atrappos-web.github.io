import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import store from "../../store";
import {
    faAngleLeft,
    faSave,
    faEraser,
    faEdit,
    faCheckSquare, faDrawPolygon, faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import EvaluationStyles from "./EvaluationStyles";
import {mapEvent} from "../../lib/utils";
import InfoTooltip from "../ui/InfoTooltip";
import {defaultObjectiveValue, defaultSubjectiveValue, mapElementsTooltipContent} from "../../lib/constants";
import {setDisableDropdowns, setPathEvaluated} from "../../actions/pathsActions";
import moment from "moment";
import {AppContext} from "../../App";

const AddEditPath =(props)=> {
    const {savePath, pathAction, returnBack,
        setAttribute, canGoBack, selectedPathName, selectedPathDescription,
        parentPathName, parentPathDescr, disableBack, beforeAnimation,
        disableStreetViewAndBack, disableEditBtn, disableEraseBtn, existingPoly, modifyStyles, pathObjective, pathSubjective } = props;

    const {dispatch} = useContext(AppContext);

    const pathsReducer = useSelector(state => state.paths);

    const [pathName, setPathName] = useState(null);
    const [pathDecr, setPathDescr] = useState(null);
    const [goBack, setGoBack] = useState(true);
    const [disableDraw, setDisableDraw] = useState(existingPoly);


    useEffect(()=> {
        if (selectedPathName){
            setPathName(selectedPathName)
        } else {
            setPathName(parentPathName)
        }
    }, [selectedPathName, parentPathName]);

    useEffect(()=> {
        if (selectedPathDescription){
            setPathDescr(selectedPathDescription)
        } else {
            setPathDescr(parentPathDescr)
        }
    }, [selectedPathDescription, parentPathDescr]);

    useEffect(()=> {
        setGoBack(canGoBack);
    }, [canGoBack]);

    const onClickDraw = (e) => {
        dispatch ({
            drawStart: moment(new Date())
        })
        store.dispatch(setDisableDropdowns(true));
        mapEvent(e, "leaflet-draw-draw-polyline");
        disableStreetViewAndBack(false);
    };


    useEffect(()=> {
        setDisableDraw(existingPoly);
    }, [existingPoly]);

    useEffect(()=> {
        if (pathSubjective === defaultSubjectiveValue || pathObjective === defaultObjectiveValue) {
            if (!existingPoly) {
                store.dispatch(setPathEvaluated(false))
            }
        } else if ((pathSubjective && pathSubjective !== defaultSubjectiveValue) ||
            (pathObjective && pathObjective === defaultObjectiveValue )) {
            if (!existingPoly) {
                store.dispatch(setPathEvaluated(true))
            }
        }
    }, [pathSubjective, pathObjective, existingPoly]);


    const sendData = (e) => {
        let property;
        let value;
        switch(true) {
            case e.target.name === "objective":
                property = "objective";
                value = e.value;
                break;
            case e.target.name === "subjective":
                property = "subjective";
                value = e.value;
                break;
            case e.target.name === "path-name":
                property = "pathName";
                value = e.target.value;
                break;
            case e.target.name === "path-description":
                property = "pathDescription";
                value = e.target.value;
                break;
            default:
                property = null;
                value=null;
        }
        setAttribute(property, value);
    };


    return (
            <div className="tab__inner tab__inner--path-fields">
                <h2 className={disableBack ? "disable--hdr": ""}
                    title={disableBack ? "You must finish editing your path in order to be able to return back": ""}
                    onClick={()=> {
                        if(!disableBack) {
                            beforeAnimation(true);
                            returnBack(null, goBack);
                        }
                    }
                }>
                    <i>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </i>
                    <span>{pathAction} path</span>
                </h2>
                <label className="path-actions--label" htmlFor="path-name">Name</label>
                <input type="text"
                       id="path-name"
                       name="path-name"
                       placeholder="Type a path name"
                       defaultValue={pathName}
                       onChange={sendData}/>
                {pathAction === "Add" ?
                    <div className="path-btns path-btns--polyline__wrapper">
                        <div className="path-btns path-btns--polyline">
                            <Button className={"path--polyline"}
                                    disabled={disableDraw || pathsReducer.disableDraw}
                                    onClick={(e)=> {
                                        onClickDraw(e)
                                    }}>
                                <i>
                                    <FontAwesomeIcon icon={faDrawPolygon} />
                                </i>
                                <span>
                                {"Draw"}
                            </span>
                            </Button>
                            <InfoTooltip id='add-element-btn-tltp'
                                         placement="right"
                                         clsName="menu"
                                         gaEvent="draw-polyline-info"
                                         content={mapElementsTooltipContent["polyline"]}/>
                        </div>
                        <div className="path-btns--notification__wrapper">
                            {pathsReducer.disableDraw ?
                            <div className="path-btns--notification path-btns--notification__pulse">
                                You need to zoom the map more
                            </div>:null}
                        </div>
                    </div>
                    :null}
                <EvaluationStyles
                        sendData={sendData}
                        pathObjective={pathObjective}
                        pathSubjective={pathSubjective}
                />
                <div className="path-btns path-btns--eval__wrapper">
                    <div className="path-btns path-btns--eval">
                        <Button className={"path--edit__styles" +
                                ((pathsReducer.evalChangeNotSubmitted && !pathsReducer.disableEvalBtn) ||
                                    (!pathsReducer.pathEvaluated) ?
                                    " path--edit__styles--changed" : ""
                                )
                                }
                                disabled={pathsReducer.disableEvalBtn ||
                                (pathAction === "Edit" && (pathsReducer.unchangedSubjective && pathsReducer.unchangedObjective))}
                                onClick={()=> modifyStyles()}>
                            <i>
                                <FontAwesomeIcon icon={((pathsReducer.evalChangeNotSubmitted && !pathsReducer.disableEvalBtn) ||
                                    (!pathsReducer.pathEvaluated) ?
                                        faExclamationCircle : faCheckSquare
                                )} />
                            </i>
                            <span>
                                {pathsReducer.evalChangeNotSubmitted || !pathsReducer.pathEvaluated ? "Submit Evaluation" : "Evaluation Submitted"}
                            </span>
                        </Button>
                        <InfoTooltip id='menu-btn-tltp--evaluate'
                                     placement="right"
                                     clsName="menu"
                                     gaEvent="submit-evaluation-info"
                                     content={mapElementsTooltipContent["styles"]}/>
                    </div>
                    <div className="path-btns--notification__wrapper">
                        {!(pathsReducer.disableEvalBtn ||
                            (pathAction === "Edit" && (pathsReducer.unchangedSubjective && pathsReducer.unchangedObjective))) && pathsReducer.evalChangeNotSubmitted ?
                            <div className="path-btns--notification">
                                Submit your modified evaluation
                            </div>:null}
                    </div>
                </div>
                <div className="path-actions--label__wrapper">
                    <label className="path-actions--label">Modify created path</label>
                </div>
                <div className="path-btns path-btns--controls">
                    <Button className="path--edit__positions"
                            disabled={!existingPoly || pathsReducer.emptyPath || disableEditBtn}
                            onClick={(e)=> {
                                mapEvent(e, "leaflet-draw-edit-edit")}}>
                        <i>
                            <FontAwesomeIcon icon={faEdit} />
                        </i>
                        <span>
                            Edit Shape
                        </span>
                    </Button>
                    <InfoTooltip id='menu-btn-tltp--edit-shape'
                                 placement="right"
                                 clsName="menu"
                                 gaEvent="edit-path-shape-info"
                                 content={mapElementsTooltipContent["shape"]}/>
                </div>
                {pathAction === "Add" ?
                    <div className="path-btns path-btns--controls btn__last">
                        <Button className="path--erase"
                                disabled={!existingPoly || pathsReducer.emptyPath || disableEraseBtn}
                                onClick={(e)=> {
                                    mapEvent(e, "leaflet-draw-edit-remove")}}>
                            <i>
                                <FontAwesomeIcon icon={faEraser} />
                            </i>
                            <span>
                                Erase
                            </span>
                        </Button>
                        <InfoTooltip id='menu-btn-tltp--erase-path'
                                     placement="right"
                                     clsName="menu"
                                     gaEvent="erase-path-info"
                                     content={mapElementsTooltipContent["erase"]}/>
                    </div>
                :null}
                <div className="path-actions--label__wrapper path-actions--label__description">
                    <label className="path-actions--label" htmlFor="path-description">Tag (Optional)</label>
                    <InfoTooltip id='modify-path-btn-tltp'
                                 placement="right"
                                 clsName="menu"
                                 gaEvent="add-description-tag-info"
                                 content={mapElementsTooltipContent["description"]}/>
                </div>
                <input type="text"
                       id="path-description"
                       name="path-description"
                       placeholder="Type any useful info"
                       defaultValue={pathDecr}
                       onChange={sendData}/>
                <div className="path-btns path-btns--save">
                    <label className="path-actions--label">Save current path</label>
                    <div className="path-btns">
                        <Button className="path--save"
                                disabled={pathsReducer.emptyPath || pathsReducer.emptyName ||
                                (pathAction === "Edit" && goBack) || !existingPoly
                                || pathsReducer.disableSave ||  (pathAction === "Add" && !pathsReducer.pathEvaluated)  ||
                                (!pathsReducer.pathEvaluated &&
                                pathsReducer.unchangedName && pathsReducer.unchangedDescription && !pathsReducer.pathEdited)}
                                onClick={savePath}>
                            <i>
                                <FontAwesomeIcon icon={faSave} />
                            </i>
                            <span>
                                Save
                            </span>
                        </Button>
                        <InfoTooltip id='menu-btn-tltp--save-path'
                                     placement="right"
                                     clsName="menu"
                                     gaEvent="save-path-info"
                                     content={mapElementsTooltipContent["save"]}/>
                    </div>
                </div>
            </div>

    );
};

export default AddEditPath;
