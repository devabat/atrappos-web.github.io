import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Accordion, Button, Card} from "react-bootstrap";
import {mapEvent} from "../../lib/utils";
import {
    faCaretDown,
    faCaretUp, faDrawPolygon, faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioSelection from "./RadioSelection";
import {categoryTypes, difficultyTypes, hardShipTypes, mapElementsTooltipContent} from "../../lib/constants";
import InfoTooltip from "../ui/InfoTooltip";

export default (props) => {
    const { type, camelType, sendData, disableStreetViewAndBack, existingPoly } = props;
    const [isOpen, setIsOpen] = useState(true);
    const [disableDraw, setDisableDraw] = useState(existingPoly);

    const pathsReducer = useSelector(state => state.paths);

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    };

    useEffect(()=> {
        if (type === 'polyline') {
            setIsOpen(true);
        }
    }, [type]);

    useEffect(()=> {
        setDisableDraw(existingPoly);
    }, [existingPoly]);

    const onClickDrawOrPlace = (e, type) => {
        mapEvent(e, "leaflet-draw-draw-" + type);
        disableStreetViewAndBack();
    };

    const disableBtn = (type) => {
        return (type === 'polyline' ? disableDraw || pathsReducer.disableDraw : (type === 'marker') ? !disableDraw || pathsReducer.disableDraw : false);
    };

    const getActiveKey = (type) => {
        return (disableDraw ? "1" : "0" );
    };


    return (
        <Accordion bsPrefix={"accordion accordion--" + type} defaultActiveKey= '0' activeKey={getActiveKey(type)}>
            <Card bsPrefix={"card card--" + type} onClick={toggleAccordion}>
                <Accordion.Toggle as={Card.Header} eventKey={type === 'polyline' ? '0' : '1'}>
                    <span>{camelType}</span>
                    <i><FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} /></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={type === 'polyline' ? '0' : '1'}>
                    <Card.Body>
                        { type === "polyline" ?
                            <React.Fragment>
                                <label className="path-actions--label">Select path difficulty level</label>
                                <span className="path-actions--caption">(Defined by polyline width)</span>
                                <RadioSelection list={difficultyTypes}
                                                type={'difficulty'}
                                                element={'polyline'}
                                                sendData={sendData}
                                />
                                <label className="path-actions--label">Select path category</label>
                                <span className="path-actions--caption">(Defined by polyline color)</span>
                                <RadioSelection list={categoryTypes}
                                                type={'category'}
                                                element={'polyline'}
                                                sendData={sendData}
                                />
                            </React.Fragment>: null
                        }
                        { type === "marker" ?
                            <React.Fragment>
                                <label className="path-actions--label">Select hardship type</label>
                                <span className="path-actions--caption">(Defined by marker's icon)</span>
                                <RadioSelection list={hardShipTypes}
                                                type={'hardship'}
                                                element={'marker'}
                                                sendData={sendData}
                                />
                            </React.Fragment>
                           :null
                        }
                        <div className="path-btns path-btns--elements">
                            <Button className={"path--" + type}
                                    disabled={disableBtn(type)}
                                    onClick={(e)=> {
                                        onClickDrawOrPlace(e, type)
                                    }}>
                                <i>
                                    <FontAwesomeIcon icon={type === "polyline" ? faDrawPolygon : faMapMarkerAlt} />
                                </i>
                                <span>
                                    {type === "polyline" ? "Draw" : "Place"}
                                </span>
                            </Button>
                            <InfoTooltip id='add-element-btn-tltp'
                                         placement="top"
                                         clsName="add-element"
                                         content={mapElementsTooltipContent[type]}/>
                        </div>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
};
