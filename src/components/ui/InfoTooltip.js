import React, {useState, useRef, useEffect} from 'react';
import{Overlay, Popover} from 'react-bootstrap';
import {faComment, faInfo, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {sendGaEvent} from "../../lib/utils";

function InfoTooltip(props) {
    const {id, clsName, content, placement, gaEvent, pathDetails} = props;
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = event => {
        setShow(!show);
        setTarget(event.target);
    };

    useEffect(()=> {
        if (show) {
            sendGaEvent({category: gaEvent, action: 'show-tooltip'});
        }
    }, [show, gaEvent]);

    return (
        <div className='tltp--wrapper' ref={ref}>
            <i className={clsName + '__btn--tltp'} onClick={handleClick}>
                {pathDetails?
                    <span className="path-details__icons">
                        <b className="bubble__icon">
                            <FontAwesomeIcon icon={faComment} />
                        </b>
                        <b className="info__icon">
                            <FontAwesomeIcon icon={faInfo} />
                        </b>
                    </span>

                    :
                    <FontAwesomeIcon icon={faInfoCircle} />
                }
            </i>
            <Overlay
                show={show}
                target={target}
                placement={placement}
                container={ref.current}
                containerPadding={20}
            >
                <Popover id={id}>
                    <Popover.Content>
                        {content}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}

export default InfoTooltip;

