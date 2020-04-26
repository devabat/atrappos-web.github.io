import React, {useState, useRef, useEffect} from 'react';
import {Accordion, Button, Card} from "react-bootstrap";
import {
    faCaretDown,
    faCaretUp,
    faExclamationTriangle, faEye, faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CommunityPaths(props) {
    const {paths, toggleSelectedCommunityPaths} = props;
    const [pathsByUser, setPathsByUser] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [visibleUserPaths, setVisibleUserPaths] = useState([]);
    const [viewState, setViewState] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    };

    const handleClick = event => {

    };

    useEffect(()=> {
        if (paths) {
            const res = paths.reduce((path, curr) => {
                if(!path[curr.userName]) path[curr.userName] = []; //If this type wasn't previously stored
                path[curr.userName].push(curr);
                return path;
            },{});
            setPathsByUser(res)
        }
    }, [paths]);

    const toggleVisibleUserPaths = (id) => {
        let idx = visibleUserPaths.indexOf(id);
        if (idx > -1) {
            visibleUserPaths.splice(idx, 1);
        } else {
            visibleUserPaths.push(id);
        }
        setViewState(prevState => ({ ...prevState, [id]: !prevState[id] }));
        setVisibleUserPaths(visibleUserPaths);
        toggleSelectedCommunityPaths(visibleUserPaths);
    };

    return (
        <div className="tab__inner tab__inner--path-community">
            <h2>Community Paths</h2>
            <h6>See other users' paths</h6>
            <div className="community-paths">
                {Object.keys(pathsByUser).map((user)=> {
                return <Accordion key={user} bsPrefix={"accordion accordion--community"}>
                    <Card bsPrefix={"card card--community"} onClick={toggleAccordion}>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <span>{user}</span>
                            <i><FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} /></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {pathsByUser[user] && pathsByUser[user].length > 0 ?
                                    <React.Fragment>
                                        {
                                            pathsByUser[user].map((path, idx)=> {
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


                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                })}
            </div>
        </div>
    );
}

export default CommunityPaths;

