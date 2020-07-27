import React, {useState, useRef, useEffect} from 'react';
import{Overlay, Popover} from 'react-bootstrap';
import {faComment, faInfo, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {sendGaEvent} from "../../lib/utils";

function InfoTooltip(props) {
    const {id, clsName, content, placement, gaEvent, pathDetails, pathName, isStreetView, isTooltipOpen} = props;
    const [show, setShow] = useState(false);
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    const handleClick = () => {
        setShow(!show);
    };

    const handleClose = () => {
        setShow(false);
    };

    useEffect(()=> {
        if (show) {
            sendGaEvent({category: gaEvent, action: 'show-tooltip'});
        }
    }, [show, gaEvent]);

    useEffect(()=> {
        if (isStreetView) {
            isTooltipOpen(show)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, isStreetView]);

    return (
        <div className='tltp--wrapper' ref={containerRef}>
            {isStreetView ?
                <span onClick={()=> {
                    if (triggerRef.current) {triggerRef.current.click()}}}
                      className='street-view__info--text'>HOW IT WORKS</span>:null
            }
            <i className={clsName + '__btn--tltp'}
               ref={triggerRef}
               onClick={handleClick}>
                {pathDetails ?
                    <React.Fragment>
                    <span className="path-details__icons">
                        <b className="bubble__icon">
                            <FontAwesomeIcon icon={faComment} />
                        </b>
                        <b className="info__icon">
                            <FontAwesomeIcon icon={faInfo} />
                        </b>
                    </span>
                    {pathName ?
                        <span className="path-list--item_name">
                            {pathName}
                        </span>
                    :null}
                    </React.Fragment>

                    :
                    <FontAwesomeIcon icon={faInfoCircle} />
                }
            </i>
            <Overlay
                show={show}
                placement={placement}
                containerPadding={20}
                container={containerRef}
                target={triggerRef}
            >
                <Popover id={id}>
                    <Popover.Content>
                        {isStreetView ?
                            <i className="close-tltp" onClick={()=>{handleClose()}}>
                                <FontAwesomeIcon icon={faTimes} />
                            </i>:null
                        }
                        {content}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}

export default InfoTooltip;

