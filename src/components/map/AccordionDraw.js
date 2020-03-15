import React, {useState} from 'react';
import {Accordion, Button, Card} from "react-bootstrap";
import {mapEvent} from "../../lib/utils";
import {
    faCaretDown,
    faCaretUp, faDrawPolygon, faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioSelection from "./RadioSelection";
import {categoryTypes, difficultyTypes, hardShipTypes} from "../../lib/constants";

export default (props) => {
    const { type, camelType, sendData } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    };

    return (
        <Accordion bsPrefix={"accordion accordion--" + type}>
            <Card bsPrefix={"card card--" + type} onClick={toggleAccordion}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <span>{camelType}</span>
                    <i><FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} /></i>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
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
                            <Button className={"path--" + type} onClick={(e)=> {mapEvent(e, "leaflet-draw-draw-" + type)}}>
                                <i>
                                    <FontAwesomeIcon icon={type === "polyline" ? faDrawPolygon : faMapMarkerAlt} />
                                </i>
                                <span>
                                    {type === "polyline" ? "Draw" : "Place"}
                                </span>
                            </Button>
                        </div>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>


    )
};
