import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import { faAngleLeft, faEdit, faEraser, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import AccordionDraw from "./AccordionDraw";
import {mapEvent} from "../../lib/utils";


const AddEditPath =(props)=> {
    const {savePath, pathAction, returnBack, setAttribute, canGoBack, selectedPathName } = props;
    const emptyEls = useSelector(state => state.paths);

    const [pathName, setPathName] = useState(null);
    const [goBack, setGoBack] = useState(true);

    useEffect(()=> {
        if(selectedPathName){
            setPathName(selectedPathName)
        } else {
            setPathName(null)
        }
    }, [selectedPathName]);

    useEffect(()=> {
        setGoBack(canGoBack);
    }, [canGoBack]);

    const sendData = (e) => {
        let property = null;
        let value = null;
        switch(true) {
            case e.target.name === "difficulty-lvl":
                property = "difficulty";
                value = e.target.value;
                break;
            case e.target.name === "category-lvl":
                property = "category";
                value = e.target.value;
                break;
            case e.target.name === "path-name":
                property = "pathName";
                value = e.target.value;
                break;
            case e.target.name === "hardship-type":
                property = "hardship";
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
                <h2 onClick={()=> {returnBack(null, goBack)}}>
                    <i>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </i>
                    <span>{pathAction} path</span>
                </h2>
                <label className="path-actions--label" htmlFor="path-name">Name</label>
                <input type="text"
                       id="typath-name"
                       name="path-name"
                       placeholder="Enter name"
                       defaultValue={pathName}
                       onChange={sendData}/>
                <label className="path-actions--label">Drawing features</label>
                <AccordionDraw type="polyline" camelType = "Polyline" sendData={sendData} />
                <AccordionDraw type="marker" camelType = "Marker" sendData={sendData} />
                <label className="path-actions--label">Modify drawn features</label>
                <div className="path-btns path-btns--controls">
                    <Button className="path--erase"
                            disabled={emptyEls.emptyCollection}
                            onClick={(e)=> {mapEvent(e, "leaflet-draw-edit-remove")}}>
                        <i>
                            <FontAwesomeIcon icon={faEraser} />
                        </i>
                        <span>
                            Erase
                        </span>
                    </Button>
                    <Button className="path--edit"
                            disabled={emptyEls.emptyCollection}
                            onClick={(e)=> {mapEvent(e, "leaflet-draw-edit-edit")}}>
                        <i>
                            <FontAwesomeIcon icon={faEdit} />
                        </i>
                        <span>
                            Edit
                        </span>
                    </Button>
                </div>
                <div className="path-btns path-btns--save">
                    <label className="path-actions--label">Save current path</label>
                    <Button className="path--save"
                            disabled={emptyEls.emptyCollection || emptyEls.emptyName || (pathAction === "Edit" && goBack)}
                            onClick={savePath}>
                        <i>
                            <FontAwesomeIcon icon={faSave} />
                        </i>
                        <span>
                            Save
                        </span>
                    </Button>
                </div>
            </div>

    );
};

export default AddEditPath;
